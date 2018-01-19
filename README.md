# ava-gama-banking

## topicos
* [requerimentos](#requerimentos)
* [instalacao](#instalacao)
* [pastas do projeto](#pastas-do-projeto)
* [iniciando os containers](#iniciando-os-containers)
* [api](#api)
    * [Consultando](#consultando-a-api)
* [base de dados](#base-de-dados)
    * [Consultando](#consultando-os-dados)
    * [Gerando um "backup"](#consultando-a-api)
    * [Restaurando um "backup"](#restaurando-um-backup)

## requerimentos
* node (versao >= 8.9.4)
    ```bash
        $ node -v
        v8.9.4
    ```
* npm (versao >= 5.6.0)
    ```bash
        $ npm -v
        5.6.0
    ```
* docker (versao >= 17.12.0-ce)
    ```bash
        $ docker -v
        Docker version 17.12.0-ce, build c97c6d6
    ```
* docker-compose (versao >= 1.18.0)
    ```bash
        $ docker-compose -v
        docker-compose version 1.18.0, build 8dd22a9
    ```
* typescript (versao >= 2.6.2)
    ```bash
        $ tsc -v
        Version 2.6.2
    ```
* @angular/cli (versao >= 1.6.3)
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
        OS: linux x64
        Angular:
        ...

    ```

## instalacao
* node

    Acessar o link e seguir os passos:
    [NodeJS](https://nodejs.org/en/download/)
* npm

    Npm já vem instaldo com o nodejs. Caso não esteja instalado acessar: [NPM](https://www.npmjs.com/get-npm)
* docker

    Acessar o link e seguir os passos

    1. [Windows](https://docs.docker.com/docker-for-windows/install/)

    2. [Ubuntu](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/)
* docker-compose

    Acessar o link e seguir os passos:
    [Docker Compose](https://docs.docker.com/compose/install/#install-compose)
* @angular/cli

    Acessar o link e seguir os passos:
    [@angular/cli](https://github.com/angular/angular-cli#installation)

## pastas do projeto
Cada pasta representa um "modulo" do projeto, onde:

* api, arquivos para a api (rotas)
* db, arquivos para a base de dados (schemas e models)
* www, projeto em angular


## iniciando os containers

1.
    ```bash
    $ cd ~/ava-gama-banking
    $ docker-compose up -d
        Starting banking.db ... done
        Starting banking.api ... done
    $
    ```
    Na primeira execução pode demorar um pouco.

    TODO: add passos para windows.

## api
### Consultando a api
    TODO:
## base de dados

### Consultando os dados
    TODO:
### Gerando um "backup"
    TODO:
### Restaurando um "backup"
    TODO: