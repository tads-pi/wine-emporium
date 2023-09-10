import bcrypt from "bcrypt"

export class BackofficeUser {
    constructor(input = {}) {
        this.name = input?.name || ""
        this.username = input?.username || ""
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
            username: this.buildUsername(this.name),
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
                username: this.username,
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
            username: this.username,
            email: this.email,
            active: this.active
        }
    }

    buildUsername(name) {
        const nameParts = name.split(" ")
        const firstName = nameParts[0]
        const lastName = nameParts[nameParts.length - 1]
        return `${firstName.charAt(0)}.${lastName.toLowerCase()}`
    }
}
