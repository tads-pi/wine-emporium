// Todo save permissions map on database with relation to group
export class Product {
    constructor(input = {}) {
        this.name = input?.name || ""
        this.slug = input?.slug || ""
        this.description = input?.description || ""
        this.price = input?.price || ""
        this.images = input?.images || []

        this.id = input?.id || ""
        this.uuid = input?.uuid || ""
        this.active = input?.active || ""
        this.deletedAt = input?.deletedAt || ""
        this.createdAt = input?.createdAt || ""
        this.updatedAt = input?.updatedAt || ""
    }

    /**
     * valida os campos do produto
     * @returns {string[]} invalid fields
     */
    validate() {
        const invalidFields = []

        // 3 or more letters from a to z
        const nameRegex = /^[a-zA-Z\s]{3,}$/
        // at least 3 letters, max 10000
        const descriptionRegex = /^.{3,10000}$/
        // at lease 1 number, up to 2 digits
        const priceRegex = /^[0-9]+([.][0-9]{1,2})?$/

        if (!nameRegex.test(this.name)) invalidFields.push("nome")
        if (!descriptionRegex.test(this.description)) invalidFields.push("descrição")
        if (!priceRegex.test(this.price)) invalidFields.push("preço")

        return invalidFields
    }

    // This method is used to parse product data to then save it to the database
    parseToSave() {
        return {
            name: this.name,
            slug: this.buildSlug(this.name),
            description: this.description,
            price: this.price,
        }
    }

    /**
     * builds a slug from a name
     * @param {*} name 
     * @returns {string} slug
     * @example
     * buildSlug("Camisa Polo") // returns "camisa-polo"
     */
    buildSlug(name) {
        const nameParts = name.split(" ")
        return nameParts.join("-").toLowerCase()
    }

    // This method is used to remove sensitive data from the object
    viewmodel(extended = false) {
        if (extended) {
            return {
                id: this.id,
                name: this.name,
                slug: this.slug,
                uuid: this.uuid,
                description: this.description,
                price: this.price,
                active: this.active,
                deletedAt: this.deletedAt,
                createdAt: this.createdAt,
                updatedAt: this.updatedAt,
                images: this.images,
                // todo add ratings
            }
        }

        return {
            name: this.name,
            slug: this.slug,
            uuid: this.uuid,
            description: this.description,
            price: this.price,
            active: this.active,
            images: this.images,
        }
    }

}
