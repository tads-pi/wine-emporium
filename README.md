# Wine Emporium Project 🍷 

## Como usar o git flow?

``` bash
# Inicializar o git flow
git flow init
```
### **IMPORTANTE!** Esses parâmetros precisam ser EXATAMENTE esses
- Branch name for production releases: [main]
- Branch name for "next release" development: [develop]

### Esses outros podem ser alterados, mas estamos usando esses padrões:
- Feature branch prefix: [feat/]
- Release branch prefix: []
- Hotfix branch prefix: [hotfix/]
- Support branch prefix: [support/]
- Version tag prefix: []

```
# Criar uma nova feature
git flow feature start <nome-da-feature>

# Finalizar uma feature
git flow publish
git flow finish
```
Assim que a feature for finalizada, ela será _mergeada_ com a branch develop. E será iniciado o deploy automaticamente!

Tudo que está em develop será enviado para main antes da entrega da semana!
Então é importante deixar a develop sempre atualizada e propriamente testada!

## URLs
### API
- dev: https://api.dev.wineemporium.shop
- prd: https://api.wineemporium.shop

### Backoffice
- dev: https://dev-admin.wineemporium.shop
- prd: https://admin.wineemporium.shop

### Store
// TODO