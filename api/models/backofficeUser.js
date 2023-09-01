import bcrypt from "bcrypt"

// Permissions
export const CREATE_USER = "CREATE_USER"
export const VIEW_EXTENDED_DATA = "VIEW_EXTENDED_DATA"
export const UPDATE_USER = "UPDATE_USER"
export const DELETE_USER = "DELETE_USER"
export const TOGGLE_ACTIVE = "TOGGLE_ACTIVE"
export const LIST_USERS = "LIST_USERS"
export const GET_USER_DATA = "GET_USER_DATA"

const groupPermissionMap = new Map([
    ["ADMINISTRADOR", [
        CREATE_USER,
        VIEW_EXTENDED_DATA,
        UPDATE_USER,
        DELETE_USER,
        LIST_USERS,
        GET_USER_DATA,
        TOGGLE_ACTIVE
    ]],
    ["ESTOQUISTA", [

    ]]
])

// Todo save permissions map on database with relation to group
export class BackofficeUser {
    constructor(input = {}) {
        this.name = input?.name || ""
        this.document = input?.document || ""
        this.email = input?.email || ""
        this.group = input?.group || ""
        this.password = input?.password || ""

        this.id = input?.id || ""
        this.active = input?.active || ""
        this.deleted = input?.deleted || ""
        this.createdAt = input?.createdAt || ""
        this.updatedAt = input?.updatedAt || ""
    }

    validate() {
        const invalidFields = []

        const nameRegex = /^[a-zA-Z\s]{3,}$/ // 3 or more letters from a to z
        const documentRegex = /([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})/ // CPF or CNPJ
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // email
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ // 8 or more letters and at least 1 number
        const validGroups = ["Administrador", "Estoquista"]

        if (!nameRegex.test(this.name)) invalidFields.push("nome")
        // TODO validar se cpf bate com padrao nacional e nao sao apenas numeros aleatorios
        if (!documentRegex.test(this.document)) invalidFields.push("documento")
        if (!emailRegex.test(this.email)) invalidFields.push("e-mail")
        if (!passwordRegex.test(this.password)) invalidFields.push("senha")
        if (!validGroups.includes(this.group)) invalidFields.push("grupo")

        return invalidFields
    }

    // This method is used to parse user data to then save it to the database
    parseToSave() {
        return {
            name: this.name,
            document: this.document,
            email: this.email,
            group: this.group,
            password: bcrypt.hashSync(this.password || "", 10)
        }
    }

    // This method is used to remove sensitive data from the object
    viewmodel(extended = false) {
        if (extended) {
            return {
                name: this.name,
                document: this.document,
                email: this.email,
                group: this.group,
                active: this.active,
                deleted: this.deleted,
                createdAt: this.createdAt,
                updatedAt: this.updatedAt
            }
        }

        return {
            name: this.name,
            email: this.email,
            active: this.active
        }
    }

    can(permission) {
        if (!groupPermissionMap.has(this.group)) {
            console.log(`Group ${this.group} not found`)
            return false
        }
        return groupPermissionMap.get(this.group).includes(permission)
    }
}
