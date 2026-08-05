# EcoBuildLab Backend

![Node.js](https://img.shields.io/badge/Node.js-22-green)
![Express](https://img.shields.io/badge/Express-5-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

Backend de **EcoBuildLab**, una API REST desarrollada con **Node.js**, **Express** y **MongoDB** para generar, almacenar y gestionar análisis bioclimáticos que apoyan el diseño arquitectónico sostenible.

La aplicación implementa autenticación mediante JWT, almacenamiento seguro de contraseñas, validación de solicitudes, manejo centralizado de errores y despliegue en Google Cloud con HTTPS.

---

# Descripción

EcoBuildLab permite a los usuarios:

- Registrarse e iniciar sesión de forma segura.
- Generar análisis bioclimáticos a partir de una ubicación.
- Guardar análisis asociados a su cuenta.
- Consultar sus análisis almacenados.
- Eliminar análisis previamente guardados.

Cada usuario únicamente puede acceder a su propia información.

---

# Tecnologías

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## Seguridad

- JSON Web Token (JWT)
- bcryptjs
- Helmet
- Express Rate Limit

## Validación

- Celebrate
- Joi

## Registro

- Winston

## Despliegue

- Google Cloud Platform (Compute Engine)
- Nginx
- Let's Encrypt
- DuckDNS

---

# Funcionalidades

- Registro de usuarios
- Inicio de sesión mediante JWT
- Contraseñas cifradas con bcrypt
- Protección de rutas privadas
- Generación de análisis bioclimáticos
- Almacenamiento de análisis por usuario
- Consulta de todos los análisis del usuario
- Consulta de un análisis por ID
- Eliminación de análisis
- Validación de solicitudes
- Manejo centralizado de errores
- Registro de solicitudes y errores
- Limitación de solicitudes (Rate Limiter)
- Encabezados de seguridad mediante Helmet

---

# Arquitectura

```text
                    Cliente

                       │
                   HTTPS (443)

                       │

                 Nginx Reverse Proxy

                       │

               Express / Node.js API

                       │

                    MongoDB
```

---

# API pública

La API se encuentra desplegada en Google Cloud y puede accederse mediante:

## Dominio

https://ecobuildlab.duckdns.org

## API

https://ecobuildlab.duckdns.org/api

---

# Endpoints

## Autenticación

### Registrar usuario

POST

```
/api/signup
```

### Iniciar sesión

POST

```
/api/signin
```

Devuelve un JWT.

---

### Usuario autenticado

GET

```
/api/users/me
```

---

## Análisis

### Generar análisis

POST

```
/api/analyses/generate
```

Genera un análisis sin almacenarlo.

---

### Guardar análisis

POST

```
/api/analyses
```

---

### Obtener todos los análisis

GET

```
/api/analyses
```

---

### Obtener un análisis

GET

```
/api/analyses/:id
```

---

### Eliminar un análisis

DELETE

```
/api/analyses/:id
```

---

# Códigos de respuesta

La API utiliza los siguientes códigos HTTP:

| Código | Descripción                |
| ------ | -------------------------- |
| 200    | OK                         |
| 201    | Recurso creado             |
| 400    | Solicitud inválida         |
| 401    | No autorizado              |
| 403    | Acceso denegado            |
| 404    | Recurso no encontrado      |
| 409    | Conflicto                  |
| 500    | Error interno del servidor |

---

# Instalación

Clonar el repositorio

```bash
git clone https://github.com/Ximerm/ecobuildlab-backend.git
```

Entrar al proyecto

```bash
cd ecobuildlab-backend
```

Instalar dependencias

```bash
npm install
```

---

# Variables de entorno

En producción crear un archivo `.env` con:

```env
NODE_ENV=production

DATABASE_URI=<mongodb_uri>

JWT_SECRET=<secret_key>
```

En modo desarrollo el proyecto funciona sin archivo `.env`.

---

# Scripts

Modo desarrollo

```bash
npm run dev
```

Modo producción

```bash
npm start
```

---

# Estructura del proyecto

```text
src
│
├── config
├── constants
├── controllers
├── errors
├── logger
├── middlewares
├── models
├── repositories
├── routes
├── services
├── validations
│
├── app.js
└── server.js
```

---

# Seguridad

La API implementa:

- Autenticación mediante JWT
- Contraseñas cifradas con bcrypt
- Validación mediante Celebrate y Joi
- Helmet
- Express Rate Limit
- Manejo centralizado de errores
- HTTPS mediante Let's Encrypt
- Reverse Proxy con Nginx

---

# Registro (Logging)

La aplicación registra:

- Todas las solicitudes HTTP en `request.log`
- Todos los errores en `error.log`

Los archivos de registro no forman parte del repositorio.

---

## Despliegue

La API se encuentra desplegada en Google Cloud Platform utilizando Nginx como
reverse proxy y certificados SSL emitidos por Let's Encrypt.

**Servidor**

https://ecobuildlab.duckdns.org

**API REST**

https://ecobuildlab.duckdns.org/api

---

# Licencia

Este proyecto se distribuye bajo la licencia MIT.

---

# Autora

Ximena Rodríguez

GitHub:

https://github.com/Ximerm
