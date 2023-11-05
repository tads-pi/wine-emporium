import backofficePermissionTable from "../sequelize/tables/backofficePermissionTable"
import backofficeRolePermissionTable from "../sequelize/tables/backofficeRolePermissionTable"
import backofficeRoleTable from "../sequelize/tables/backofficeRoleTable"

const getRolePermissions = async (roleId, callback) => {
    if (!roleId) {
        return callback(400, "Role ID is required")
    }

    const roleData = await backofficeRoleTable.findByPk(roleId)
    if (!roleData) {
        return callback(404, "Role not found")
    }

    const role = roleData.dataValues

    const permissionsData = await backofficeRolePermissionTable.findAll({
        where: {
            role_id: role.id
        }
    })
    if (!permissionsData) {
        return callback(404, "Permissions not found")
    }

    const permissionsIDs = permissionsData.map((permission) => permission?.dataValues?.id || null)
    const permissions = await backofficePermissionTable.findAll({
        where: {
            id: permissionsIDs
        }
    })

    return callback(200, permissions)
}

export default {
    getRolePermissions
}