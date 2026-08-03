# EcoBuildLab Backend

API REST desarrollada para EcoBuildLab, una aplicación web que genera análisis climáticos y recomendaciones de diseño bioclimático pasivo para apoyar las primeras etapas del diseño arquitectónico.

---

## Funcionalidades

- Registro de usuarios
- Autenticación mediante JWT
- Contraseñas almacenadas mediante hash con bcrypt
- Protección de rutas privadas
- Generación de análisis climáticos
- Almacenamiento de análisis por usuario
- Consulta de análisis guardados
- Eliminación de análisis
- Validación de solicitudes con Celebrate y Joi
- Manejo centralizado de errores
- Registro de solicitudes y errores
- Limitación de solicitudes (Rate Limiter)
- Encabezados de seguridad mediante Helmet

---

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- Celebrate
- Joi
- Helmet
- Winston
- Express Rate Limit

---

## Instalación

Clonar el repositorio

```bash
git clone https://github.com/Ximerm/ecobuildlab-backend.git
```

Instalar dependencias

```bash
npm install
```

Ejecutar en modo desarrollo

```bash
npm run dev
```

Ejecutar en modo producción

```bash
npm start
```

---

## Variables de entorno

Crear un archivo `.env` con la siguiente información:

```text
NODE_ENV=production

DATABASE_URI=<mongodb-uri>

JWT_SECRET=<secret-key>
```

En modo desarrollo el proyecto funciona sin archivo `.env`.

---

## Endpoints de la API

### Autenticación

POST `/api/signup`

POST `/api/signin`

GET `/api/users/me`

### Análisis bioclimáticos

POST `/api/analyses/generate`

POST `/api/analyses`

GET `/api/analyses`

GET `/api/analyses/:id`

DELETE `/api/analyses/:id`

---

## Estructura del proyecto

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

## Despliegue

Una vez desplegada la aplicación, la API estará disponible en:

```
https://tu-dominio.com/api
```

---

## Autora

**Ximena Rodríguez**
