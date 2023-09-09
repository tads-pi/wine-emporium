
// aqui vao todas as informacoes que a API deveria retornar para testar
// esse arquivo é util quando o back-end ainda nao esta pronto
// o ideal é sempre verificar a documentacao na rota:
// api.wineemporium.shop/docs
// 
// aí, caso a rota nao esteja pronta, voce pode usar um arquivo como esse
// de testes!

export const data = [
    {
        "id": 1,
        "name": "Fausto Silva",
        "document": "000.000.000-00",
        "email": "email@example.com",
        "password": "***",
        "group": "Admin",
        "active": false,
        "deleted": true,
        "createAt": "2023-08-30T04:56:15.000Z",
        "updatedAt": "2023-08-30T04:56:15.000Z"
    },
    {
        "id": 2,
        "name": "Neymar Jr",
        "document": "000.000.000-00",
        "email": "email@example.com",
        "password": "***",
        "group": "Admin",
        "active": false,
        "deleted": false,
        "createAt": "2023-08-30T04:56:15.000Z",
        "updatedAt": "2023-08-30T04:56:15.000Z"
    },
    {
        "id": 3,
        "name": "Silvio Santos",
        "document": "000.000.000-00",
        "email": "email@example.com",
        "password": "***",
        "group": "Admin",
        "active": true,
        "deleted": false,
        "createAt": "2023-08-30T04:56:15.000Z",
        "updatedAt": "2023-08-30T04:56:15.000Z"
    }
]