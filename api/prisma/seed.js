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

async function addInitialProducts() {
    await prisma.product.createMany({
        data: [
            {
                "id": "25816ca5-3cf5-4b79-8128-a8ca20bb6ee7",
                "name": "Baron Philippe de Rothschild Carménère 2022",
                "description": "Exemplar elaborado com uvas rigorosamente selecionadas no Vale Central chileno pela renomada vinícola Baron Philippe de Rothschild. Com um estilo versátil, este tinto pode ser degustado sozinho ou harmonizado, com pratos do dia a dia e petiscos.",
                "price": 99.99,
                "ratings": 4.50,
                "markedImageID": "1a5a14fa-b379-448c-aa53-aae1efd3df43.png",
                "active": true
            },
            {
                "id": "c9b02a48-e47d-465c-adfb-e707e5a6684a",
                "name": "Wine Glass",
                "description": "A stemmed glass for enjoying wine",
                "price": 19.99,
                "ratings": 4.00,
                "markedImageID": "25bf39cc-3f23-4266-a05f-759e9cbe2f15.png",
                "active": true
            },
            {
                "id": "e3fce052-220c-4140-a7ef-1a9669cef205",
                "name": "Wine Opener",
                "description": "A tool for opening wine bottles",
                "price": 4.99,
                "ratings": 3.50,
                "markedImageID": "1816c8f1-5ed7-423a-9b6e-ac717c2d1501.png",
                "active": true
            },
            {
                "id": "3de67daa-f331-4c90-8b08-4804d2a501d2",
                "name": "Faisán Tannat Cabernet 2022",
                "description": "Aquele vinho frutado que é coringa, leve e fácil de beber! A Tannat entra com estrutura, taninos, enquanto a Cabernet Sauvignon aporta os aromas de especiarias, o resultado é um blend expressivo nos aromas frutados, bem estruturado e com um toque de mineralidade. Um exemplar descomplicado, fácil de beber e agradar!",
                "price": 52.90,
                "ratings": 4.50,
                "markedImageID": "c0fa6f9e-bef1-4118-b3b6-b6e5d7b6cc7e.png",
                "active": true
            },
            {
                "id": "c8911ad0-114e-49ed-8959-5a6f8a39475f",
                "name": "Heredad 71 Sedoso",
                "description": "A Bodegas Leganza está localizada no meio das paisagens de La Mancha, no coração da Rota de Dom Quixote. Seus vinhos demonstram a capacidade de mudar, de transformar, de trabalhar com novas ideias para desenvolver vinhos com personalidade. São exemplares jovens, descomplicados e frutados que transmitem modernidade e frescor.",
                "price": 155.90,
                "ratings": 4.00,
                "markedImageID": "730abb72-e8ef-4980-acd1-09b81324a87e.png",
                "active": true
            },
            {
                "id": "1f9b9b41-b3bc-4184-96c1-e4cba9035958",
                "name": "Pueblo del Sol Pinot Noir 2023",
                "description": "Para a produção deste Pinot Noir, as uvas foram colhidas com base na degustação das bagas e análise das sementes ainda no vinhedo. Com isso, a equipe de enologia consegue identificar o ponto perfeito de maturação da uva e escolher o melhor momento para vindimá-la.",
                "price": 249.90,
                "ratings": 2.50,
                "markedImageID": "2c113421-bf37-4099-8429-61a5a780c3c7.png",
                "active": true
            }
        ]
    })

}

Promise.all(
    [
        addBackofficeClientsGroupsAndPermissions(),
        addClientGenders(),
        addPaymentMethods(),
        addDeliverers(),
        addInitialProducts()
    ]
)
    .catch(e => {
        console.log(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })