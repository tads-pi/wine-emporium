| total de testes até o momento      | {{total_tests}}        |
|------------------------------------|------------------------|
| última atualização                 | {{latest_update_date}} |

----------------------------------------------------------------------------------------------------------------------------------


# Planejamento de testes para o projeto
separamos o planejamento de testes por controllers e por entities, para que possamos ter uma visão mais clara do que deve ser testado e como deve ser testado!

como cada controller representa um grupo de rotas da nossa aplicação, portanto um mesmo contexto, então podemos testar todas as rotas de um controller em um único arquivo de teste, por exemplo, o controller de usuários, que tem as rotas de login, cadastro, atualização, etc, todas essas rotas podem ser testadas em um único arquivo de teste, pois todas elas estão no mesmo contexto, que é o contexto de usuários!

eeeee somado com isso tb faz super sentido testar nossas entidades, que são os arquivos FUNDAMENTAIS que fazem a ponte entre as requisições e o banco de dados, então é super importante testar esses arquivos, pois eles são a base do funcionamento da nossa api!

### backoffice controllers
- authController
- backofficeController
- backofficeProductController
### store controllers
- productController

### backoffice entities
- user
- product

### store entities
- product


----------------------------------------------------------------------------------------------------------------------------------


# Controllers
## Testes unitários
- testar se as funções estão retornando os valores esperados em casos de sucesso/falha

| porcentagem de funcoes testadas | authController | backofficeController | backofficeProductController | productController |
|---------------------------------|----------------|----------------------|-----------------------------|-------------------|
| > 10%                           |❌              |❌                     |❌                           |❌                 |
| > 50%                           |❌              |❌                     |❌                           |❌                 |
| > 80%                           |❌              |❌                     |❌                           |❌                 |

## Testes de integração
- testar conexões externas

| banco de dados   | api dos correios |
|------------------|------------------|
| ❌               | ❌               |

- testar se as rotas estão retornando o esperado em caso de sucesso/falha

| porcentagem de rotas testadas   | authController | backofficeController | backofficeProductController | productController |
|---------------------------------|----------------|----------------------|-----------------------------|-------------------|
| > 10%                           |❌              |❌                     |❌                           |❌                 |
| > 50%                           |❌              |❌                     |❌                           |❌                 |
| > 80%                           |❌              |❌                     |❌                           |❌                 |


----------------------------------------------------------------------------------------------------------------------------------


# Entities
## Testes unitários
- testar se as entidades estão retornando os valores esperados em casos de sucesso/falha

| porcentagem de funcoes testadas | user | product |
|---------------------------------|------|---------|
| > 10%                           |❌    |❌       |
| > 50%                           |❌    |❌       |
| > 80%                           |❌    |❌       |
