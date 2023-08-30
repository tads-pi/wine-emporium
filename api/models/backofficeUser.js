export class BackofficeUser {
    constructor(requestBody = {}) {
        this.name = requestBody?.name || ""
        this.document = requestBody?.document || ""
        this.email = requestBody?.email || ""
        this.password = requestBody?.password || ""
        this.group = requestBody?.group || ""
    }

    validate() {
        // todo make regex
        const invalidFields = []

        if (this.name.length < 3) invalidFields.push("name")
        if (this.document.length < 3) invalidFields.push("document")
        if (this.email.length < 3) invalidFields.push("email")
        if (this.password.length < 3) invalidFields.push("password")
        if (this.group.length < 3) invalidFields.push("group")

        return invalidFields
    }
}
