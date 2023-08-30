export class BackofficeUser {
    constructor(request_body = {}) {
        this.name = request_body?.name || ""
        this.document = request_body?.document || ""
        this.email = request_body?.email || ""
        this.password = request_body?.password || ""
        this.group = request_body?.group || ""
    }

    validate() {
        // todo make regex
        const invalid_fields = []

        if (this.name.length < 3) invalid_fields.push("name")
        if (this.document.length < 3) invalid_fields.push("document")
        if (this.email.length < 3) invalid_fields.push("email")
        if (this.password.length < 3) invalid_fields.push("password")
        if (this.group.length < 3) invalid_fields.push("group")

        return invalid_fields
    }

}