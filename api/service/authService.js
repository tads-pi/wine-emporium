// Todo save permissions map on database with relation to group

// Backoffice user Permissions
export const CREATE_USER = "CREATE_USER"
export const VIEW_USER_EXTENDED_DATA = "VIEW_USER_EXTENDED_DATA"
export const UPDATE_USER = "UPDATE_USER"
export const DELETE_USER = "DELETE_USER"
export const TOGGLE_USER_ACTIVE = "TOGGLE_USER_ACTIVE"
export const LIST_USERS = "LIST_USERS"
export const GET_USER_DATA = "GET_USER_DATA"
export const SAVE_PRODUCT_IMAGE = "SAVE_PRODUCT_IMAGE"

// Permissions
export const CREATE_PRODUCT = "CREATE_PRODUCT"
export const VIEW_PRODUCT_EXTENDED_DATA = "VIEW_PRODUCT_EXTENDED_DATA"
export const UPDATE_PRODUCT = "UPDATE_PRODUCT"
export const DELETE_PRODUCT = "DELETE_PRODUCT"
export const TOGGLE_PRODUCT_ACTIVE = "TOGGLE_PRODUCT_ACTIVE"
export const LIST_PRODUCT = "LIST_PRODUCTS"
export const GET_PRODUCT_DATA = "GET_PRODUCT_DATA"

const groupPermissionMap = new Map([
    ["ADMINISTRADOR", [
        CREATE_USER,
        VIEW_USER_EXTENDED_DATA,
        UPDATE_USER,
        DELETE_USER,
        LIST_USERS,
        GET_USER_DATA,
        TOGGLE_USER_ACTIVE,
        CREATE_PRODUCT,
        VIEW_PRODUCT_EXTENDED_DATA,
        UPDATE_PRODUCT,
        DELETE_PRODUCT,
        TOGGLE_PRODUCT_ACTIVE,
        LIST_PRODUCT,
        GET_PRODUCT_DATA,
        SAVE_PRODUCT_IMAGE,
    ]],
    ["ESTOQUISTA", [
        CREATE_PRODUCT,
        VIEW_PRODUCT_EXTENDED_DATA,
        LIST_PRODUCT,
        TOGGLE_PRODUCT_ACTIVE,
        SAVE_PRODUCT_IMAGE,
    ]]
])

function userCan(userContext, permission) {
    const group = userContext?.group ?? "unknown"
    if (!groupPermissionMap.has(group)) {
        console.log(`Group ${group} not found`)
        return false
    }
    return groupPermissionMap.get(group).includes(permission)
}

export default {
    userCan
}