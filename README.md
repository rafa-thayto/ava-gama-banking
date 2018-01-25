# ava-gama-banking

## Tópicos
* [Requerimentos](#requerimentos)
* [Instalação](#instalacao)
* [Pastas do projeto](#pastas-do-projeto)
* [Api](#api)
    * [Consultando](#consultando-a-api)
* [Interfaces](#interfaces)
* [Base de dados](#base-de-dados)
    * [Consultando](#consultando-os-dados)
    * [Gerando um "backup"](#consultando-a-api)
    * [Restaurando um "backup"](#restaurando-um-backup)

## Requerimentos
* node (versão >= 8.9.4)
    ```bash
        $ node -v
        v8.9.4
    ```
* npm (versão >= 5.6.0)
    ```bash
        $ npm -v
        5.6.0
    ```
* typescript (versão >= 2.6.2)
    ```bash
        $ tsc -v
        Version 2.6.2
    ```
* @angular/cli (versão >= 1.6.3)
    ```bash
        $ ng -v
            _                      _                 ____ _     ___
           / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
          / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
         / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
        /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                       |___/
        Angular CLI: 1.6.3
        Node: 8.9.4
        OS: linux x64 / win
        Angular:
        ...

    ```

## Instalação

* node

    Acessar o link e seguir os passos:

    [NodeJS](https://nodejs.org/en/download/)

* npm

    Npm já vem instalado com o nodejs. Caso não esteja instalado acessar: [NPM](https://www.npmjs.com/get-npm)

* @angular/cli

    Acessar o link e seguir os passos:

    [@angular/cli](https://github.com/angular/angular-cli#installation)

## Pastas do projeto

Cada pasta representa um "módulo" do projeto, onde:

* api, arquivos para a api (rotas);
* db, módulo do banco de dados (schemas e models);
* www, projeto de Internet Banking em angular.


## Iniciando o projeto

* ###### Primeiro prompt

1.
    ```bash
    $ cd ~/ava-gama-banking/db && npm install
    $ cd ../api && npm install
    $ npm start
    ```
* ###### Segundo prompt

2.
    ```bash
    $ cd ~/ava-gama-banking/www/ && npm install
    $ ng serve --open
    ```

    Na primeira execução pode demorar um pouco.

## Interfaces

Link:
[moqups](https://app.moqups.com/pjpimentel/ggNkI8HDZw/edit/page/a63cc1cd1)

## Base de dados

dados de aceso:

    ip: 67.205.161.225
    usuario: gama
    senha: Z3xXgYkQVnsuJ3Cu

### Gerando novos dados

```bash
    $ cd ~/ava-gama-banking/db/seed
    $ node ./createClients.js
    $ node ./createAccounts.js
    $ node ./createTransactions.js
```
*Importante: executar na respectiva ordem.

## Api

Para gerar a documentação, seguir os passos:
```bash
    $ cd ~/ava-gama-banking/api
    $ ./generateDocs.sh
```
Para consultar a documentação, abrir o arquivo ~/ava-gama-banking/api/docs/index.html no navegador
