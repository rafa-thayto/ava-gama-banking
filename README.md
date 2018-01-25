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

### Diagrama de Classe

![diagrama](https://raw.githubusercontent.com/rafa-thayto/ava-gama-banking/dev/db/diagrama.png)

### ODM - Mongoose

Utilizado para gerenciar a conexao com a base de dados e criar, consultar e validar documentos.

### dados de aceso:

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

### Senhas

Todas as senhas são armazenadas em hash. O bcrypt é utilizado para gerar os hashs.

## Api

### Framework = ExpressJS
### Autenticacao

* [Json Web Token](https://jwt.io/)

        header.payload.signature

* Fluxo para geracao do token:
  1. Requisição contendo credencial
  2. API recebe dados
  3. Consulta base de dados pelo respectivo usuário
  4. Confere se a senha enviada coincide com a hash da senha armazenada no db
  5. Gera TOKEN e envia token ao cliente

* O token expira a cada 1 hora, sendo necessário uma nova autenticação

* Fluxo para autenticacao:
  1. Usuario envia requisição à api com o seguinte header:
``` http
    Authorization: JWT <token>
```
  2. API recebe solicitação
  3. Verifica se o token é valido (autentica)
  4. Captura o payload do token e armazena na req
  5. As rotas utilizam as informações que estão no escopo da req
  6. Reposta é fornecida ao usuario conforme documentação abaixo.
### Documentacao

1. gerar:
```bash
    $ cd ~/ava-gama-banking/api
    $ ./generateDocs.sh
```
2. abrir arquivo ~/ava-gama-banking/api/docs/index.html no navegador
