<div align="center">
    <img src=".github/Logo.png" alt="Ignite ToDO" />
    <p>A fullstack application to training and improve my knowledge about .NET and NextJS</p>
</div>

<img src=".github/Capa.png" alt="Event Platform" />

## 💻 Overview
This application was developed as challenge of Ignite program by RocketSeat. The ToDo app is a simple example of a web application to control tasks based on a design created by RocketSeat.

[![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/file/TUc2b4qnq5V9smabwasppc/ToDo-List?type=design&node-id=101%3A96&mode=design&t=cXcUzPSS6esxp5Vc-1)

## ✅ Features

- [x] Create a new Task
- [x] Mark and unmark a task as complete
- [x] Remove a task from the list
- [x] Show task completion progress

## 🚀 Tech Stack

The following tools were used in the construction of the project:

<code><img height="32" src="https://cdn.simpleicons.org/csharp/512BD4" alt="csharp"/></code>
<code><img height="32" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/dotnet/dotnet.png" alt=".NET"/></code>
<code><img height="32" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" alt="Javascript"/></code>
<code><img height="32" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png" alt="Typescript"/></code>
<code><img height="32" src="https://cdn.simpleicons.org/nextdotjs/000000/FFF" alt="nextdotjs"/></code>
<code><img height="32" src="https://cdn.simpleicons.org/microsoftsqlserver/CC2927" alt="microsoftsqlserver"/></code>
<code><img height="32" src="https://cdn.simpleicons.org/tailwindcss/06B6D4" alt="tailwindcss"/></code>
<code><img height="32" src="https://cdn.simpleicons.org/docker/2496ED" alt="docker"/></code>

## 👉 Run project
Before you begin, you will need to have the following tools installed on your machine:
[Git](https://git-scm.com), [npm](https://www.npmjs.com/)
In addition, it is good to have an editor to work with the code like [VSCode](https://code.visualstudio.com/).

```bash

# Clone this repository
$ git clone https://github.com/KassiaMabily/IgniteToDo.git

# go to the project folder
$ cd IgniteToDo

```

### Local development

To run the project locally, you will need to install SQL Server and dotnet EF, or you can create a container only for [SQL Server](https://hub.docker.com/_/microsoft-mssql-server) and then install dotnet EF by the following command: `dotnet tool install --global dotnet-ef`

#### Frontend

```bash

# Go to frontend folder
$ cd web

# go to the project folder
$ npm i

# run
$ npm run dev

```

#### Backend

```bash

# Go to backend folder
$ cd api

# Applying migrations to database
$ dotnet ef database update

# Run the project
$ dotnet run --lauch-profile https

```

### Docker
In this application I used a Linux container, so I enforced a HTTPS. To do this we have to generate a trusted certificate, replace `$CREDENTIAL_PLACEHOLDER$` within your credential key and then put in `docker-composer.override.yml` file

> **Reference:** https://learn.microsoft.com/pt-br/aspnet/core/security/docker-compose-https?view=aspnetcore-7.0

**Generate certificate for windows**

```powershell
> dotnet dev-certs https -ep "$env:USERPROFILE\.aspnet\https\aspnetapp.pfx"  -p $CREDENTIAL_PLACEHOLDER$

> dotnet dev-certs https --trust
```


```bash
$ docker-compose -f docker-compose.yml -f docker-compose.override.yml -p todo up -d --build
```
