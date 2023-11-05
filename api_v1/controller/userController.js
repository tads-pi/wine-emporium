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

const deleteAddress = async (req, res) => {
    await storeUserService.deleteAddress(req, res)
}

const addAddress = async (req, res) => {
    await storeUserService.addAddress(req, res)
}

const setMainAddress = async (req, res) => {
    await storeUserService.setMainAddress(req, res)
}

export default {
    saveUser,
    getUser,
    updateUser,
    deleteAddress,
    addAddress,
    setMainAddress,
}