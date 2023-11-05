import authService, { DELETE_USER, UPDATE_USER, CREATE_USER, LIST_USERS, GET_USER_DATA, TOGGLE_USER_ACTIVE } from "../service/authService.js"
import backofficeUserService from "../service/backofficeUserService.js"

// TODO LIDAR OCM ERROS DENTRO DA APLICACAO E NAO RETORNAR PRO FRONT
// TODO adicionar camada de servico para esse controller
/**
 * salva um usuario no banco de dados
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const saveBackofficeUser = async (req, res) => {
    // validates permission
    if (!authService.userCan(req.context.user, CREATE_USER)) {
        res.status(403).json({
            message: "Usuário não tem permissão para criar usuários"
        })
        return
    }

    await backofficeUserService.saveBackofficeUser(req, res)
}

/**
 * retorna todos os usuarios do banco de dados
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getAllBackofficeUsers = async (req, res) => {
    // validates permission
    if (!authService.userCan(req.context.user, LIST_USERS)) {
        res.status(403).json({
            message: "Usuário não tem permissão para listar usuários"
        })
        return
    }

    await backofficeUserService.getAllBackofficeUsers(req, res)
}

/**
 * retorna um usuario do banco de dados
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getBackofficeUser = async (req, res) => {
    // validates permission
    if (!authService.userCan(req.context.user, GET_USER_DATA)) {
        res.status(403).json({
            message: "Usuário não tem permissão para ler dados de outro usuário"
        })
        return
    }

    await backofficeUserService.getBackofficeUser(req, res)
}

/**
 * atualiza um usuario no banco de dados
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateBackofficeUser = async (req, res) => {
    // validates permission
    if (!authService.userCan(req.context.user, UPDATE_USER)) {
        res.status(403).json({
            message: "Usuário não tem permissão para atualizar outro usuário"
        })
        return
    }

    await backofficeUserService.updateBackofficeUser(req, res)
}

/**
 * ativa ou desativa um usuario no banco de dados
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const deactivateBackofficeUser = async (req, res) => {
    // check if user that is authenticated can deactivate other users
    if (!authService.userCan(req.context.user, TOGGLE_USER_ACTIVE)) {
        res.status(403).json({
            message: "Usuário não tem permissão para desativar usuários"
        })
        return
    }

    await backofficeUserService.toggleBackofficeUserActive(req, res)
}

/**
 * deleta um usuario no banco de dados
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const deleteBackofficeUser = async (req, res) => {
    // check if user that is authenticated can delete another users
    if (!authService.userCan(req.context.user, DELETE_USER)) {
        res.status(403).json({
            message: "Usuário não tem permissão para deletar usuários"
        })
        return
    }

    await backofficeUserService.deleteBackofficeUser(req, res)
}

export default {
    saveBackofficeUser,
    getAllBackofficeUsers,
    getBackofficeUser,
    updateBackofficeUser,
    deactivateBackofficeUser,
    deleteBackofficeUser
}