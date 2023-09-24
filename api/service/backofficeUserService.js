import BackofficeUser from "../entity/backofficeUser.js"
import backofficeUserTable from "../sequelize/tables/backofficeUserTable.js"
import authService, { VIEW_USER_EXTENDED_DATA } from "./authService.js"
import bcrypt from "bcrypt"

const saveBackofficeUser = async (req, res) => {
    // validates user data
    const user = new BackofficeUser(req.body)
    const validate = user.validate()
    if (validate.length > 0) {
        res.status(400).json({
            message: `Campos Inválidos: ${validate.join(", ")}`
        })
        return
    }

    // execute
    const data = await backofficeUserTable.create(user.parseToSave())
    const userID = data?.dataValues?.id ?? null
    if (!userID) {
        res.status(500).json({
            message: "Erro ao salvar usuário"
        })
        return
    }

    res.status(201).json({
        message: "Usuário criado com sucesso."
    })
}

const getAllBackofficeUsers = async (req, res) => {
    const getExtendedData = authService.userCan(req.context.user, VIEW_USER_EXTENDED_DATA)

    // validates user data
    const page = req.query?.page ?? 1
    const limit = req.query?.limit ?? 10
    const offset = Number(limit) * (Number(page) - 1)

    const filterRequest = req.query?.filters || ""

    const findAllClause = {
        where: {
            deleted: false
        },
        limit: Number(limit),
        offset: Number(offset)
    }
    const filters = filterRequest.split(",") || []
    if (filters.length > 0 && filters[0] !== "") {
        for (const filter of filters) {
            const [key, value] = filter.split(":")
            findAllClause.where[key] = value === "true" ? true : value === "false" ? false : value
        }
    }

    const data = await backofficeUserTable.findAll(findAllClause)
    if (!data) {
        res.status(500).json({
            message: "Erro ao buscar usuários"
        })
        return
    }

    const users = []
    if (data?.length > 0) {
        data.map(({ dataValues: unparsedUser }) => {
            users.push(new BackofficeUser(unparsedUser).viewmodel(getExtendedData))
        })
    }


    res.status(200).json(users)
}

const getBackofficeUser = async (req, res) => {
    const getExtendedData = authService.userCan(req.context.user, VIEW_USER_EXTENDED_DATA)

    // validates input data
    const userID = req.params.id ?? ""
    if (userID === "") {
        res.status(400).json({
            message: "Campo user_id inválido"
        })
        return
    }

    // execute
    const data = await backofficeUserTable.findByPk(userID)
    if (!data) {
        res.status(404).json({
            message: "Usuário não encontrado"
        })
        return
    }

    const user = new BackofficeUser(data.dataValues)

    res.status(200).json(user.viewmodel(getExtendedData))
}

const updateBackofficeUser = async (req, res) => {
    // TODO verificar old_password antes de permitir atualizar a senha!!!

    // validates input data
    const fieldsToUpdate = req.body ?? {}
    const userID = req.params.id ?? ""

    const updateClause = {
        where: {
            id: userID
        }
    }

    if (fieldsToUpdate?.password) {
        fieldsToUpdate.password = bcrypt.hashSync(fieldsToUpdate?.password || "", 10)
    }

    const data = await backofficeUserTable.update(fieldsToUpdate, updateClause)
    if (!data) {
        res.status(500).json({
            message: "Erro ao atualizar usuário"
        })
        return
    }

    res.status(200).json({
        message: "Usuário atualizado com sucesso"
    })
}

const toggleBackofficeUserActive = async (req, res) => {
    const userID = req.params.id ?? ""
    if (userID === "") {
        res.status(400).json({
            message: "Invalid user id"
        })
        return
    }

    const data = await backofficeUserTable.findByPk(userID)
    if (!data) {
        res.status(404).json({
            message: "Usuário não encontrado"
        })
        return
    }

    const activeStatus = req?.body?.active || false
    const user = {
        active: activeStatus
    }

    const updateClause = {
        where: {
            id: userID
        }
    }

    await backofficeUserTable.update(user, updateClause)

    res.status(200).json({
        message: `Usuário ${user.active ? "ativado" : "desativado"} com sucesso`
    })
}

const deleteBackofficeUser = async (req, res) => {
    const userID = req.params.id ?? ""
    if (userID === "") {
        res.status(400).json({
            message: "user_id Inválido"
        })
        return
    }

    const data = backofficeUserTable.findByPk(userID)
    if (!data) {
        res.status(404).json({
            message: "Usuário não encontrado"
        })
        return
    }

    const user = new BackofficeUser(data.dataValues)
    if (!user) {
        res.status(404).json({
            message: "Usuário não encontrado"
        })
        return
    }

    user.deleted = true
    const updateClause = {
        where: {
            id: user.id
        }
    }

    const updateData = await backofficeUserTable.update(user, updateClause)
    if (!updateData) {
        res.status(500).json({
            message: "Erro ao deletar usuário"
        })
        return
    }

    res.status(200).json({
        message: "Usuário deletado com sucesso"
    })
}

export default {
    saveBackofficeUser,
    getAllBackofficeUsers,
    getBackofficeUser,
    updateBackofficeUser,
    toggleBackofficeUserActive,
    deleteBackofficeUser
}