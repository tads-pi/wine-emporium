import { BackofficeUser } from "../models/backofficeUser.js";
import BackofficeUserRepository from "../repository/backofficeUserRepository.js";

// TODO LIDAR OCM ERROS DENTRO DA APLICACAO E NAO RETORNAR PRO FRONT 

// backoffice new user
// req: { name, document, email, password, group }
// res: { ok }
export const saveBackofficeUser = async (req, res) => {
    const user = new BackofficeUser(req.body);
    const validate = user.validate();
    if (validate.length > 0) {
        res.status(400).json({
            message: `Invalid fields: ${validate.join(", ")}`
        })
        return
    }

    // TODO RETORNAR UUID AO INVES DO ID DIRETO DO USER (exposição de dados não necessários)
    BackofficeUserRepository.create(user).then((result) => {
        res.status(201).json({
            message: "User created successfully",
            id: result.id
        })
    }).catch((err) => {
        res.status(500).json({
            message: err.message
        })
    });
}

// backoffice get all users
// req: { }
// res: { []User }
export const getAllBackofficeUsers = async (req, res) => {
    const findAllClause = {
        where: {
            deleted: false
        }
    }

    BackofficeUserRepository.findAll(findAllClause).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json({
            message: err.message
        })
    });
}

// backoffice get user
// req: { id }
// res: { user }
export const getBackofficeUser = async (req, res) => {
    const userID = req.params.id ?? ""
    if (userID === "") {
        res.status(400).json({
            message: "Invalid user id"
        })
        return
    }

    BackofficeUserRepository.findByPk(userID).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json({
            message: err.message
        })
    });
}

// backoffice update user
// req: { id, name, document, email, group } -> user cannot update own group
// res: { ok }
export const updateBackofficeUser = async (req, res) => {
    const user = new BackofficeUser(req.body, req.params);
    const validate = user.validate();
    if (validate.length > 0) {
        res.status(400).json({
            message: `Invalid fields: ${validate.join(", ")}`
        })
        return
    }

    const updateClause = {
        where: {
            id: user.id,
        },
    }

    BackofficeUserRepository.update(user, updateClause).then((result) => {
        res.status(200).json({
            message: "User updated successfully",
        })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({
            message: err.message
        })
    });
}

// backoffice deactivate user (set active false)
// req: { id }
// res: { ok }
// TODO filtrar users q tem acesso pra fazer isso
export const deactivateBackofficeUser = async (req, res) => {
    const userID = req.params.id ?? ""
    if (userID === "") {
        res.status(400).json({
            message: "Invalid user id"
        })
        return
    }

    BackofficeUserRepository.findByPk(userID).then((result) => {
        const user = result.dataValues
        user.deleted = true

        const updateClause = {
            where: {
                id: user.id,
            },
        }

        BackofficeUserRepository.update(user, updateClause).then((result) => {
            res.status(200).json({
                message: "User deleted successfully",
            })
        }).catch((err) => {
            res.status(500).json({
                message: err.message
            })
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message
        })
    });
}

// backoffice delete user (set deleted true)
// req: { id }
// res: { ok }
export const deleteBackofficeUser = async (req, res) => {
    const userID = req.params.id ?? ""
    if (userID === "") {
        res.status(400).json({
            message: "Invalid user id"
        })
        return
    }

    BackofficeUserRepository.findByPk(userID).then((result) => {
        const user = result.dataValues
        user.deleted = true

        const updateClause = {
            where: {
                id: user.id,
            },
        }

        BackofficeUserRepository.update(user, updateClause).then((result) => {
            res.status(200).json({
                message: "User deleted successfully",
            })
        }).catch((err) => {
            res.status(500).json({
                message: err.message
            })
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message
        })
    });
}
