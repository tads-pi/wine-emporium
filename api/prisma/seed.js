const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

dotenv.config();

async function addBackofficeClientsGroupsAndPermissions() {
    await prisma.backofficeGroup.create({
        data: {
            name: "ADMINISTRADOR",
            BackofficeClient: {
                create: {
                    name: "Administrador",
                    email: "admin@gmail.com",
                    password: "$2a$10$fHlpSahCN/xElXUFgg3YMevlIEwshS3nIbtcInOmTQtTNGUbi5jmC",  // password
                    document: "12345678900",
                    active: true,
                },
            },
        },
    });
    await prisma.backofficeGroup.create({
        data: {
            name: "ESTOQUISTA",
            BackofficeClient: {
                create: {
                    name: "Estoquista",
                    email: "estoquista@gmail.com",
                    password: "$2a$10$fHlpSahCN/xElXUFgg3YMevlIEwshS3nIbtcInOmTQtTNGUbi5jmC", // password
                    document: "00000000191",
                    active: true,
                },
            },
        },
    });

    await prisma.backofficePermission.createMany({
        data: [
            { name: "LIST_USER" },
            { name: "CREATE_USER" },
            { name: "READ_USER" },
            { name: "UPDATE_USER" },
            { name: "TOGGLE_USER_ACTIVE" },

            { name: "LIST_PRODUCT" },
            { name: "CREATE_PRODUCT" },
            { name: "READ_PRODUCT" },
            { name: "UPDATE_PRODUCT" },
            { name: "UPDATE_PRODUCT_NAME" },
            { name: "UPDATE_PRODUCT_DESCRIPTION" },
            { name: "UPDATE_PRODUCT_PRICE" },
            { name: "UPDATE_PRODUCT_RATINGS" },
            { name: "UPDATE_PRODUCT_STOCK" },
            { name: "UPDATE_PRODUCT_STOCK_UNIT" },
            { name: "DELETE_PRODUCT" },

            { name: "CREATE_PRODUCT_IMAGE" },
            { name: "DELETE_PRODUCT_IMAGE" },
            { name: "MARK_PRODUCT_IMAGE" },
            { name: "TOGGLE_PRODUCT_ACTIVE" }
        ],
    })

    const ADMINISTRADOR = await prisma.backofficeGroup.findUnique({ where: { name: "ADMINISTRADOR" }, select: { id: true } })
    const ESTOQUISTA = await prisma.backofficeGroup.findUnique({ where: { name: "ESTOQUISTA" }, select: { id: true } })
    const PERMISSIONS = {
        LIST_USER: await prisma.backofficePermission.findUnique({ where: { name: "LIST_USER" } }),
        CREATE_USER: await prisma.backofficePermission.findUnique({ where: { name: "CREATE_USER" } }),
        READ_USER: await prisma.backofficePermission.findUnique({ where: { name: "READ_USER" } }),
        UPDATE_USER: await prisma.backofficePermission.findUnique({ where: { name: "UPDATE_USER" } }),
        TOGGLE_USER_ACTIVE: await prisma.backofficePermission.findUnique({ where: { name: "TOGGLE_USER_ACTIVE" } }),

        LIST_PRODUCT: await prisma.backofficePermission.findUnique({ where: { name: "LIST_PRODUCT" } }),
        CREATE_PRODUCT: await prisma.backofficePermission.findUnique({ where: { name: "CREATE_PRODUCT" } }),
        READ_PRODUCT: await prisma.backofficePermission.findUnique({ where: { name: "READ_PRODUCT" } }),
        UPDATE_PRODUCT: await prisma.backofficePermission.findUnique({ where: { name: "UPDATE_PRODUCT" } }),
        UPDATE_PRODUCT_NAME: await prisma.backofficePermission.findUnique({ where: { name: "UPDATE_PRODUCT_NAME" } }),
        UPDATE_PRODUCT_DESCRIPTION: await prisma.backofficePermission.findUnique({ where: { name: "UPDATE_PRODUCT_DESCRIPTION" } }),
        UPDATE_PRODUCT_PRICE: await prisma.backofficePermission.findUnique({ where: { name: "UPDATE_PRODUCT_PRICE" } }),
        UPDATE_PRODUCT_RATINGS: await prisma.backofficePermission.findUnique({ where: { name: "UPDATE_PRODUCT_RATINGS" } }),
        UPDATE_PRODUCT_STOCK: await prisma.backofficePermission.findUnique({ where: { name: "UPDATE_PRODUCT_STOCK" } }),
        UPDATE_PRODUCT_STOCK_UNIT: await prisma.backofficePermission.findUnique({ where: { name: "UPDATE_PRODUCT_STOCK_UNIT" } }),
        DELETE_PRODUCT: await prisma.backofficePermission.findUnique({ where: { name: "DELETE_PRODUCT" } }),

        CREATE_PRODUCT_IMAGE: await prisma.backofficePermission.findUnique({ where: { name: "CREATE_PRODUCT_IMAGE" } }),
        DELETE_PRODUCT_IMAGE: await prisma.backofficePermission.findUnique({ where: { name: "DELETE_PRODUCT_IMAGE" } }),
        MARK_PRODUCT_IMAGE: await prisma.backofficePermission.findUnique({ where: { name: "MARK_PRODUCT_IMAGE" } }),
        TOGGLE_PRODUCT_ACTIVE: await prisma.backofficePermission.findUnique({ where: { name: "TOGGLE_PRODUCT_ACTIVE" } })
    }

    await prisma.backofficeGroupPermission.createMany({
        data: [
            { backofficeGroupId: ADMINISTRADOR.id, backofficePermissionId: PERMISSIONS.LIST_USER.id },
            { backofficeGroupId: ADMINISTRADOR.id, backofficePermissionId: PERMISSIONS.CREATE_USER.id },
            { backofficeGroupId: ADMINISTRADOR.id, backofficePermissionId: PERMISSIONS.READ_USER.id },
            { backofficeGroupId: ADMINISTRADOR.id, backofficePermissionId: PERMISSIONS.UPDATE_USER.id },
            { backofficeGroupId: ADMINISTRADOR.id, backofficePermissionId: PERMISSIONS.TOGGLE_USER_ACTIVE.id },

            { backofficeGroupId: ADMINISTRADOR.id, backofficePermissionId: PERMISSIONS.LIST_PRODUCT.id },
            { backofficeGroupId: ADMINISTRADOR.id, backofficePermissionId: PERMISSIONS.CREATE_PRODUCT.id },
            { backofficeGroupId: ADMINISTRADOR.id, backofficePermissionId: PERMISSIONS.READ_PRODUCT.id },
            { backofficeGroupId: ADMINISTRADOR.id, backofficePermissionId: PERMISSIONS.UPDATE_PRODUCT.id },
            { backofficeGroupId: ADMINISTRADOR.id, backofficePermissionId: PERMISSIONS.DELETE_PRODUCT.id },

            { backofficeGroupId: ADMINISTRADOR.id, backofficePermissionId: PERMISSIONS.CREATE_PRODUCT_IMAGE.id },
            { backofficeGroupId: ADMINISTRADOR.id, backofficePermissionId: PERMISSIONS.DELETE_PRODUCT_IMAGE.id },
            { backofficeGroupId: ADMINISTRADOR.id, backofficePermissionId: PERMISSIONS.MARK_PRODUCT_IMAGE.id },
            { backofficeGroupId: ADMINISTRADOR.id, backofficePermissionId: PERMISSIONS.TOGGLE_PRODUCT_ACTIVE.id },

            { backofficeGroupId: ESTOQUISTA.id, backofficePermissionId: PERMISSIONS.LIST_PRODUCT.id },
            { backofficeGroupId: ESTOQUISTA.id, backofficePermissionId: PERMISSIONS.CREATE_PRODUCT.id },
            { backofficeGroupId: ESTOQUISTA.id, backofficePermissionId: PERMISSIONS.READ_PRODUCT.id },
            { backofficeGroupId: ESTOQUISTA.id, backofficePermissionId: PERMISSIONS.UPDATE_PRODUCT_STOCK.id },
            { backofficeGroupId: ESTOQUISTA.id, backofficePermissionId: PERMISSIONS.UPDATE_PRODUCT_STOCK_UNIT.id },

            { backofficeGroupId: ESTOQUISTA.id, backofficePermissionId: PERMISSIONS.CREATE_PRODUCT_IMAGE.id },
            { backofficeGroupId: ESTOQUISTA.id, backofficePermissionId: PERMISSIONS.DELETE_PRODUCT_IMAGE.id },
            { backofficeGroupId: ESTOQUISTA.id, backofficePermissionId: PERMISSIONS.MARK_PRODUCT_IMAGE.id },
            { backofficeGroupId: ESTOQUISTA.id, backofficePermissionId: PERMISSIONS.TOGGLE_PRODUCT_ACTIVE.id },
        ]
    })
}

async function addClientGenders() {
    // todo arrumar caracteres utf-8 zuadins
    await prisma.gender.createMany({
        data: [
            {
                firiendlyName: "Masculino",
                name: "MASCULINO",
            },
            {
                firiendlyName: "Feminino",
                name: "FEMININO",
            },
            {
                firiendlyName: "Não Binário",
                name: "NAO_BINARIO",
            },
            {
                firiendlyName: "Gênero Fluido",
                name: "GENERO_FLUIDO",
            },
            {
                firiendlyName: "Outro",
                name: "OUTRO",
            },
            {
                firiendlyName: "Prefiro não informar",
                name: "PREFIRO_NAO_INFORMAR",
            }
        ],
    });
}

async function addPaymentMethods() {
    await prisma.paymentMethod.createMany({
        data: [
            {
                friendlyName: "Cartão de Crédito",
                name: "CARTAO_DE_CREDITO",
            },
            {
                friendlyName: "Boleto",
                name: "BOLETO",
            },
        ],
    });
}

async function addDeliverers() {
    await prisma.deliverer.createMany({
        data: [
            {
                name: "Correios",
                fare: 20.99,
            },
            {
                name: "WE Transportes",
                fare: 32.99,
            },
            {
                name: "Retirar na loja",
                fare: 0,
            },
            {
                name: "Entrega Expressa",
                fare: 50.99,
            },
            {
                name: "Entregadores Ltda.",
                fare: 23.99,
            },
            {
                name: "Entregas Rápidas",
                fare: 15.99,
            },
            {
                name: "Dois Irmãos Transportes",
                fare: 29.99,
            },
            {
                name: "Sedex",
                fare: 21.99,
            }
        ],
    });
}

Promise.all(
    [
        addBackofficeClientsGroupsAndPermissions(),
        addClientGenders(),
        addPaymentMethods(),
        addDeliverers()
    ]
)
    .catch(e => {
        console.log(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })