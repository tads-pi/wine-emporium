
export default class Address {
    constructor(input = {}) {
        this.userUUID = input?.userUUID || ""

        this.cep = input?.cep || ""
        this.logradouro = input?.logradouro || ""
        this.complemento = input?.complemento || ""
        this.numero = input?.numero || ""
        this.cidade = input?.cidade || ""
        this.bairro = input?.bairro || ""
        this.uf = input?.uf || ""
        this.faturamento = input?.faturamento || false
        this.principal = input?.principal || false

        this.id = input?.id || ""
        this.active = input?.active || ""
        this.deleted = input?.deleted || ""
        this.createdAt = input?.createdAt || ""
        this.updatedAt = input?.updatedAt || ""
    }
}