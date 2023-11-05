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

async function findUserByUUID(uuid) {
    const findClause = {
        where: {
            uuid: uuid
        }
    }

    const userData = await storeUserTable.findOne(findClause)
    if (!userData) {
        return null
    }

    const addressData = await storeUserAddressTable.findAll({
        // Sort by field 'principal' in descending order
        order: [
            ['principal', 'DESC']
        ],
        where: {
            userUUID: userData.uuid,
            deleted: false,
        }
    })

    const foundUser = new User({
        ...userData.dataValues,
        address: addressData.map((a) => new Address(a.dataValues).viewmodel())
    })

    return foundUser
}

const getUser = async (req, res) => {
    const user = req.context.user
    const foundUser = await findUserByUUID(user?.uuid)
    if (!foundUser) {
        res.status(404).json({
            message: "Usuário não encontrado"
        })
        return
    }

    res.status(200).json(foundUser.viewmodel())
}

async function updateUserData(id, fieldsToUpdate) {
    const data = await storeUserTable.findByPk(id)
    if (!data) {
        return "Usuário não encontrado"
    }

    const updateClause = {
        where: {
            id: id
        }
    }

    const updateData = await storeUserTable.update(fieldsToUpdate, updateClause)
    if (!updateData) {
        return "Erro ao atualizar usuário"
    }

    return ""
}

const updateUser = async (req, res) => {
    const user = req.context.user
    const foundUser = await findUserByUUID(user?.uuid)
    if (!foundUser) {
        res.status(404).json({
            message: "Usuário não encontrado"
        })
        return
    }

    const userFieldsToUpdate = req.body
    delete userFieldsToUpdate.address

    const userUpdateError = await updateUserData(foundUser.id, userFieldsToUpdate)
    if (userUpdateError !== "") {
        res.status(400).json({
            message: userUpdateError
        })
        return
    }

    res.status(200).json({})
}

const deleteAddress = async (req, res) => {
    const user = req.context.user
    const addressID = req.params?.id ?? ""
    if (!addressID) {
        res.status(400).json({
            message: "id de endereço inválido"
        })
        return
    }

    const isUserAddress = await storeUserAddressTable.findOne({
        where: {
            id: addressID,
            userUUID: user.uuid
        }
    })
    if (!isUserAddress) {
        res.status(404).json({
            message: "Endereço não encontrado"
        })
        return
    }

    const updateClause = {
        deleted: true
    }

    const findClause = {
        where: {
            id: addressID
        }
    }

    await storeUserAddressTable.update(updateClause, findClause)
    res.status(200).json({
        message: "Endereço deletado com sucesso"
    })
}

const addAddress = async (req, res) => {
    const address = new Address(req.body)
    const validate = address.validate()
    if (validate.length > 0) {
        res.status(400).json({
            message: `Campos Inválidos: ${validate.join(", ")}`
        })
        return
    }

    const ok = await storeUserAddressTable.create(address)
    if (!ok) {
        res.status(500).json({
            message: "Erro ao salvar endereço"
        })
        return
    }

    res.status(200).json({
        message: "Endereço adicionado com sucesso"
    })
}

const setMainAddress = async (req, res) => {
    const user = req.context.user
    const addressID = req.params?.id ?? ""
    if (!addressID) {
        res.status(400).json({
            message: "id de endereço inválido"
        })
        return
    }

    const isUserAddress = await storeUserAddressTable.findOne({
        where: {
            id: addressID,
            userUUID: user.uuid
        }
    })
    if (!isUserAddress) {
        res.status(404).json({
            message: "Endereço não encontrado"
        })
        return
    }

    async function clearAll() {
        const updateClause = {
            principal: false
        }

        const findClause = {
            where: {
                userUUID: user.uuid
            }
        }

        return await storeUserAddressTable.update(updateClause, findClause)
    }

    async function setAsMain() {
        const updateClause = {
            principal: true
        }

        const findClause = {
            where: {
                id: addressID
            }
        }

        return await storeUserAddressTable.update(updateClause, findClause)
    }

    let ok = await clearAll()
    if (!ok) {
        res.status(500).json({
            message: "Erro ao atualizar endereço"
        })
        return
    }

    ok = await setAsMain()
    if (!ok) {
        res.status(500).json({
            message: "Erro ao atualizar endereço"
        })
        return
    }

    res.status(200).json({
        message: "Endereço principal atualizado com sucesso"
    })
}

export default {
    saveUser,
    getUser,
    updateUser,
    deleteAddress,
    addAddress,
    setMainAddress,
}