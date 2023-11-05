import { v4 as uuid } from "uuid"
import bcrypt from "bcrypt"

export default class User {
    constructor(input = {}) {
        this.uuid = input?.uuid || uuid()
        this.name = input?.name || ""
        this.document = input?.document || ""
        this.email = input?.email || ""
        this.birthDate = input?.birthDate || ""
        this.gender = input?.gender || ""
        this.password = input?.password || ""
        this.address = input?.address || []

        this.id = input?.id || ""
        this.active = input?.active || ""
        this.deleted = input?.deleted || ""
        this.createdAt = input?.createdAt || ""
        this.updatedAt = input?.updatedAt || ""
    }

    /**
     * valida os dados do usuario
     * @returns {Array<string>} lista de campos invalidos
     */
    validate() {
        const invalidFields = []

        const nameRegex = /^[a-zA-Z\s]{3,}$/ // 3 or more letters from a to z
        const documentRegex = /([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})/ // CPF or CNPJ
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // email
        // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ // 8 or more letters and at least 1 number

        if (!nameRegex.test(this.name)) invalidFields.push("name")
        // TODO validar se cpf bate com padrao nacional e nao sao apenas numeros aleatorios
        if (!documentRegex.test(this.document)) invalidFields.push("document")
        if (!emailRegex.test(this.email)) invalidFields.push("email")
        if (!this.gender) invalidFields.push("gender")
        if (!this.birthDate) invalidFields.push("birthDate")


        return invalidFields
    }

    parseToSave() {
        return {
            uuid: this.uuid,
            name: this.name,
            gender: this.gender,
            document: this.document,
            email: this.email,
            birthDate: this.birthDate,
            password: bcrypt.hashSync(this.password || "", 10)
        }
    }

    viewmodel() {
        return {
            uuid: this.uuid,
            name: this.name,
            document: this.document,
            email: this.email,
            birthDate: this.birthDate,
            gender: this.gender,
            address: this.address,
        }
    }
}