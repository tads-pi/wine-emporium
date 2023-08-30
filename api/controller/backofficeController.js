// backoffice new user
// req: { name, document, email, password, group }
// res: { ok }
export const saveBackofficeUser = async (req, res) => {
    res.status(200).json({
        message: "//todo"
    })
}

// backoffice get all users
// req: { }
// res: { []User }
export const getAllBackofficeUsers = async (req, res) => {
    res.status(200).json({
        message: "//todo"
    })
}

// backoffice get user
// req: { id }
// res: { user }
export const getBackofficeUser = async (req, res) => {
    res.status(200).json({
        message: `//todo ${req.params.id}`
    })
}

// backoffice update user
// req: { id, name, document, email, group } -> user cannot update own group
// res: { ok }
export const updateBackofficeUser = async (req, res) => {
    res.status(200).json({
        message: `//todo ${req.params.id}`
    })
}

// backoffice delete user (set active false)
// req: { id }
// res: { ok }
export const deleteBackofficeUser = async (req, res) => {
    res.status(200).json({
        message: `//todo ${req.params.id}`
    })
}
