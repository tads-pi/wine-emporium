import { BackofficeUser, DELETE_USER, UPDATE_USER, CREATE_USER, LIST_USERS, GET_USER_DATA, VIEW_EXTENDED_DATA, TOGGLE_ACTIVE } from "../models/backofficeUser.js"
import BackofficeUserRepository from "../repository/backofficeUserRepository.js"

// TODO LIDAR OCM ERROS DENTRO DA APLICACAO E NAO RETORNAR PRO FRONT

export const saveBackofficeUser = async (req, res) => {
    // validates permission
    const userContext = new BackofficeUser(req.body.user_context)
    console.log("userContext: ", userContext)
    if (!userContext.can(CREATE_USER)) {
        res.status(403).json({
            message: "Usuário não tem permissão para criar usuários"
        })
        return
    }

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
    BackofficeUserRepository.create(user.parseToSave()).then((result) => {
        res.status(201).json({
            message: "Usuário criado com sucesso."
        })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({
            message: err.message
        })
    })
}

export const getAllBackofficeUsers = async (req, res) => {
    // validates permission
    const userContext = new BackofficeUser(req.body.user_context)
    console.log("userConext: ", userContext)
    if (!userContext.can(LIST_USERS)) {
        res.status(403).json({
            message: "Usuário não tem permissão para listar usuários"
        })
        return
    }
    const getExtendedData = userContext.can(VIEW_EXTENDED_DATA)

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
    if (!Object.keys(filterRequest.split(","))[0] === "") {
        for (const filter of filterRequest.split(",")) {
            const [key, value] = filter.split(":")
            findAllClause.where[key] = value
        }
    }
    console.log("findAllClause: ", findAllClause)

    BackofficeUserRepository.findAll(findAllClause).then((result) => {
        result = result.map((unparsedUser) => {
            return new BackofficeUser(unparsedUser).viewmodel(getExtendedData)
        })

        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json({
            message: err.message
        })
    })
}

export const getBackofficeUser = async (req, res) => {
    // validates permission
    const userContext = new BackofficeUser(req.body.user_context)
    if (!userContext.can(GET_USER_DATA)) {
        res.status(403).json({
            message: "Usuário não tem permissão para ler dados de outro usuário"
        })
        return
    }
    const getExtendedData = userContext.can(VIEW_EXTENDED_DATA)

    // validates input data
    const userID = req.params.id ?? ""
    if (userID === "") {
        res.status(400).json({
            message: "Campo user_id inválido"
        })
        return
    }

    // execute
    BackofficeUserRepository.findByPk(userID).then((result) => {
        const user = new BackofficeUser(result)
        res.status(200).json(user.viewmodel(getExtendedData))
    }).catch((err) => {
        res.status(500).json({
            message: err.message
        })
    })
}

export const updateBackofficeUser = async (req, res) => {
    // validates permission
    const userContext = new BackofficeUser(req.body.user_context)
    if (!userContext.can(UPDATE_USER)) {
        res.status(403).json({
            message: "Usuário não tem permissão para atualizar outro usuário"
        })
        return
    }
    // TODO verificar old_password antes de permitir atualizar a senha!!!

    // validates input data
    const fieldsToUpdate = req.body ?? {}
    const userID = req.params.id ?? ""

    const updateClause = {
        where: {
            id: userID
        }
    }

    BackofficeUserRepository.update(fieldsToUpdate, updateClause).then((result) => {
        res.status(200).json({
            message: "Usuário atualizado com sucesso"
        })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({
            message: err.message
        })
    })
}

export const deactivateBackofficeUser = async (req, res) => {
    // check if user that is authenticated can deactivate other users
    const userContext = new BackofficeUser(req.body.user_context)
    if (!userContext.can(TOGGLE_ACTIVE)) {
        res.status(403).json({
            message: "Usuário não tem permissão para desativar usuários"
        })
        return
    }

    // handle deactivation
    const userID = req.params.id ?? ""
    if (userID === "") {
        res.status(400).json({
            message: "Invalid user id"
        })
        return
    }

    BackofficeUserRepository.findByPk(userID).then((result) => {
        const user = result.dataValues
        user.active = !user.active

        const updateClause = {
            where: {
                id: user.id
            }
        }

        BackofficeUserRepository.update(user, updateClause).then((result) => {
            res.status(200).json({
                message: `Usuário ${user.active ? "ativado" : "desativado"} com sucesso`
            })
        }).catch((err) => {
            res.status(500).json({
                message: err.message
            })
        })
    }).catch((err) => {
        res.status(500).json({
            message: err.message
        })
    })
}

export const deleteBackofficeUser = async (req, res) => {
    // check if user that is authenticated can delete another users
    const userContext = new BackofficeUser(req.body.user_context)
    if (userContext.can(DELETE_USER)) {
        res.status(403).json({
            message: "Usuário não tem permissão para deletar usuários"
        })
        return
    }

    const userID = req.params.id ?? ""
    if (userID === "") {
        res.status(400).json({
            message: "user_id Inválido"
        })
        return
    }

    BackofficeUserRepository.findByPk(userID).then((result) => {
        const user = result.dataValues
        user.deleted = true

        const updateClause = {
            where: {
                id: user.id
            }
        }

        BackofficeUserRepository.update(user, updateClause).then((result) => {
            res.status(200).json({
                message: "Usuário deletado com sucesso"
            })
        }).catch((err) => {
            res.status(500).json({
                message: err.message
            })
        })
    }).catch((err) => {
        res.status(500).json({
            message: err.message
        })
    })
}
