import storeUserService from "../service/storeUserService.js"

const saveUser = async (req, res) => {
    await storeUserService.saveUser(req, res)
}

const getUser = async (req, res) => {
    await storeUserService.getUser(req, res)
}

const updateUser = async (req, res) => {
    await storeUserService.updateUser(req, res)
}

export default {
    saveUser,
    getUser,
    updateUser,
}