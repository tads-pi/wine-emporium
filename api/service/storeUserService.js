import User from "../entity/user.js"
import storeUserTable from "../sequelize/tables/storeUserTable.js"
import storeUserAddressTable from "../sequelize/tables/storeUserAddressTable.js"
import Address from "../entity/address.js"

const saveUser = async (req, res) => {
    const user = new User(req.body)
    const validate = user.validate()
    if (validate.length > 0) {
        res.status(400).json({
            message: `Campos Inválidos: ${validate.join(", ")}`
        })
        return
    }

    const invalidFields = []
    const findCPFClause = {
        where: {
            document: user.document
        }
    }
    const cpfData = await storeUserTable.findOne(findCPFClause)
    if (cpfData) {
        invalidFields.push("cpf")
    }

    const findEmailClause = {
        where: {
            email: user.email
        }
    }
    const emailData = await storeUserTable.findOne(findEmailClause)
    if (emailData) {
        invalidFields.push("email")
    }

    if (invalidFields.length > 0) {
        res.status(400).json({
            message: `Campos Inválidos: ${invalidFields.join(", ")}`
        })
        return
    }

    // execute
    const data = await storeUserTable.create(user.parseToSave())
    const userID = data?.dataValues?.id ?? null
    if (!userID) {
        res.status(500).json({
            message: "Erro ao salvar usuário"
        })
        return
    }

    for (const a of user.address) {
        const address = new Address(a)
        address.userUUID = user.uuid

        await storeUserAddressTable.create(address)
    }

    res.status(201).json({
        message: "Usuário criado com sucesso."
    })
}

const getUser = async (req, res) => {
    const user = req.context.user

    const findClause = {
        where: {
            uuid: user?.uuid
        }
    }

    const userData = await storeUserTable.findOne(findClause)
    if (!userData) {
        res.status(404).json({
            message: "Usuário não encontrado"
        })
        return
    }

    const addressData = await storeUserAddressTable.findAll({
        where: {
            userUUID: userData.uuid
        }
    })

    const foundUser = new User({
        ...userData.dataValues,
        address: addressData.map((a) => new Address(a.dataValues))
    })

    res.status(200).json(foundUser)
}

export default {
    saveUser,
    getUser,
}