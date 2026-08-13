# EcoBuildLab Backend

Backend de **EcoBuildLab**, una API REST desarrollada con **Node.js**, **Express** y **MongoDB** para generar, almacenar y gestionar análisis bioclimáticos orientados al diseño arquitectónico sostenible.

La API implementa autenticación mediante JWT, almacenamiento seguro de contraseñas, validación de solicitudes, manejo centralizado de errores, logging, protección de rutas y medidas de seguridad para su despliegue en producción.

---

## Descripción

EcoBuildLab permite a los usuarios:

- Registrarse e iniciar sesión de forma segura.
- Generar análisis bioclimáticos a partir de una ubicación.
- Guardar análisis asociados a su cuenta.
- Consultar sus análisis almacenados.
- Consultar un análisis individual.
- Eliminar análisis previamente guardados.

Los análisis guardados están asociados al usuario autenticado. Cada usuario únicamente puede acceder a sus propios análisis.

---

## Tecnologías

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Seguridad

- JSON Web Token (JWT)
- bcryptjs
- Helmet
- Express Rate Limit

### Validación

- Celebrate
- Joi

### Logging

- Winston

### Despliegue

- Google Cloud Platform — Compute Engine
- Nginx
- Let's Encrypt
- DuckDNS

---

## Funcionalidades

- Registro de usuarios.
- Inicio de sesión mediante JWT.
- Contraseñas cifradas mediante bcrypt.
- Protección de rutas privadas.
- Generación de análisis bioclimáticos.
- Almacenamiento de análisis por usuario.
- Consulta de análisis guardados.
- Consulta de un análisis por ID.
- Eliminación de análisis.
- Validación de solicitudes.
- Manejo centralizado de errores.
- Registro de solicitudes y errores.
- Limitación de solicitudes mediante Rate Limit.
- Encabezados de seguridad mediante Helmet.
- Autorización de acceso a los recursos según el usuario autenticado.

---

## Arquitectura

```text
                         Cliente
                            │
                            │ HTTPS
                            ▼
                    Nginx Reverse Proxy
                            │
                            ▼
                     Express / Node.js
                            │
             ┌──────────────┴──────────────┐
             │                             │
             ▼                             ▼
       Servicios de análisis          MongoDB
             │
             ▼
        Open-Meteo API
```

La aplicación está organizada siguiendo una separación por capas para facilitar el mantenimiento, la escalabilidad y la reutilización del código.

---

## API de producción

La API se encuentra desplegada en Google Cloud Platform y es accesible mediante HTTPS.

### Dominio

https://ecobuildlab.duckdns.org

### Base URL de la API

https://ecobuildlab.duckdns.org/api

---

## Endpoints

### Autenticación

#### Registrar usuario

```http
POST /api/signup
```

Permite crear una nueva cuenta de usuario.

---

#### Iniciar sesión

```http
POST /api/signin
```

Autentica al usuario y devuelve un token JWT.

---

### Usuario autenticado

#### Obtener información del usuario actual

```http
GET /api/users/me
```

Devuelve la información del usuario autenticado.

Esta ruta requiere un token JWT válido.

---

### Análisis bioclimáticos

#### Generar un análisis

```http
POST /api/analyses/generate
```

Genera un análisis bioclimático a partir de una ubicación.

El análisis generado no se almacena automáticamente en la base de datos.

---

#### Guardar un análisis

```http
POST /api/analyses
```

Guarda un análisis bioclimático asociado al usuario autenticado.

Esta ruta requiere autenticación mediante JWT.

---

#### Obtener los análisis guardados

```http
GET /api/analyses
```

Devuelve los análisis guardados por el usuario autenticado.

Esta ruta requiere autenticación mediante JWT.

---

#### Obtener un análisis específico

```http
GET /api/analyses/:id
```

Devuelve el análisis indicado mediante su identificador.

Esta ruta requiere autenticación mediante JWT.

El usuario únicamente puede acceder a sus propios análisis.

---

#### Eliminar un análisis

```http
DELETE /api/analyses/:id
```

Elimina el análisis indicado mediante su identificador.

Esta ruta requiere autenticación mediante JWT.

El usuario únicamente puede eliminar sus propios análisis.

---

## Autenticación

Las rutas protegidas utilizan autenticación mediante **JSON Web Token (JWT)**.

Después de iniciar sesión correctamente, el servidor devuelve un token JWT que el frontend almacena y utiliza para realizar solicitudes autenticadas.

El token se envía mediante el encabezado HTTP:

```http
Authorization: Bearer <token>
```

### Principales rutas protegidas

```text
GET    /api/users/me
POST   /api/analyses
GET    /api/analyses
GET    /api/analyses/:id
DELETE /api/analyses/:id
```

El acceso a los análisis está limitado al usuario autenticado al que pertenecen.

---

## Códigos de respuesta

La API utiliza códigos de estado HTTP estándar:

| Código | Descripción                       |
| ------ | --------------------------------- |
| 200    | Solicitud procesada correctamente |
| 201    | Recurso creado correctamente      |
| 400    | Solicitud inválida                |
| 401    | No autorizado                     |
| 403    | Acceso denegado                   |
| 404    | Recurso no encontrado             |
| 409    | Conflicto                         |
| 500    | Error interno del servidor        |

---

## Instalación

### Clonar el repositorio

```bash
git clone https://github.com/Ximerm/ecobuildlab-backend.git
```

### Entrar al proyecto

```bash
cd ecobuildlab-backend
```

### Instalar dependencias

```bash
npm install
```

---

## Variables de entorno

La aplicación utiliza variables de entorno para configurar la conexión con MongoDB y la autenticación mediante JWT.

En producción se deben configurar las variables correspondientes.

Ejemplo:

```env
NODE_ENV=production
DATABASE_URI=<mongodb_uri>
JWT_SECRET=<secret_key>
```

Las variables que contienen información sensible no deben almacenarse en el repositorio.

---

## Scripts

### Desarrollo

```bash
npm run dev
```

Ejecuta el servidor en modo desarrollo.

### Producción

```bash
npm start
```

Inicia la aplicación en modo producción.

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

La estructura separa las responsabilidades principales de la aplicación entre rutas, controladores, servicios, repositorios, modelos, validaciones, middlewares y configuración.

---

## Seguridad

La API implementa diferentes mecanismos de seguridad:

- Autenticación mediante JWT.
- Contraseñas cifradas mediante bcrypt.
- Validación de solicitudes mediante Celebrate y Joi.
- Encabezados de seguridad mediante Helmet.
- Limitación de solicitudes mediante Express Rate Limit.
- Manejo centralizado de errores.
- HTTPS mediante Let's Encrypt.
- Nginx como reverse proxy.
- Autorización de recursos según el usuario autenticado.

---

## Logging

La aplicación utiliza Winston para registrar solicitudes y errores.

Se registran:

- Solicitudes HTTP en `request.log`.
- Errores de la aplicación en `error.log`.

Los archivos de registro no forman parte del repositorio.

---

## Despliegue

La API se encuentra desplegada en Google Cloud Platform (Compute Engine).

La infraestructura utiliza:

- Ubuntu
- Node.js
- Express
- MongoDB
- Nginx
- Let's Encrypt
- DuckDNS

Nginx funciona como reverse proxy y gestiona las solicitudes HTTPS antes de enviarlas a la aplicación Node.js.

### Servidor

https://ecobuildlab.duckdns.org

### API REST

https://ecobuildlab.duckdns.org/api

---

## Integración con el frontend

El backend proporciona los servicios utilizados por el frontend de EcoBuildLab.

El frontend utiliza la API para:

- Registrar usuarios.
- Autenticar usuarios.
- Obtener la información del usuario autenticado.
- Generar análisis climáticos.
- Guardar análisis.
- Consultar análisis guardados.
- Consultar el detalle de un análisis.
- Eliminar análisis.

La comunicación entre frontend y backend se realiza mediante solicitudes HTTP sobre HTTPS.

---

## Flujo de autenticación

```text
Usuario
   │
   ▼
Frontend
   │
   │ POST /api/signup
   │ POST /api/signin
   ▼
Backend
   │
   ▼
JWT
   │
   ▼
Frontend
   │
   │ Authorization: Bearer <token>
   ▼
Rutas protegidas
   │
   ▼
Backend
```

---

## Flujo de generación del análisis

```text
Usuario
   │
   ▼
Selecciona una ubicación
   │
   ▼
Frontend
   │
   │ POST /api/analyses/generate
   ▼
Backend
   │
   ▼
Open-Meteo API
   │
   ▼
Procesamiento de datos climáticos
   │
   ▼
Clasificación Caldas-Lang
   │
   ▼
Estrategias bioclimáticas
   │
   ▼
Resultado del análisis
```

Cuando el usuario decide guardar el análisis:

```text
Resultado del análisis
        │
        ▼
POST /api/analyses
        │
        ▼
     MongoDB
        │
        ▼
Análisis asociado al usuario
```

---

## Flujo de autorización de recursos

Los análisis guardados están relacionados con el usuario autenticado.

```text
Usuario autenticado
        │
        ▼
       JWT
        │
        ▼
     Backend
        │
        ▼
Identificación del usuario
        │
        ▼
Consulta de sus análisis
        │
        ▼
     MongoDB
```

De esta forma, un usuario no puede consultar ni eliminar análisis pertenecientes a otra cuenta.

---

## Servicios externos

EcoBuildLab utiliza servicios externos para obtener información climática.

### Open-Meteo

La aplicación utiliza Open-Meteo para obtener:

- Datos históricos del clima.
- Información de ubicación mediante geocodificación.

Los datos obtenidos son procesados por el backend para generar los indicadores climáticos y las recomendaciones bioclimáticas.

---

## Clasificación climática

A partir de los datos climáticos procesados, EcoBuildLab utiliza el sistema de clasificación **Caldas-Lang** para determinar el tipo de clima predominante.

La clasificación se utiliza posteriormente para seleccionar estrategias bioclimáticas pasivas relacionadas con las condiciones ambientales del sitio.

---

## Repositorio

GitHub:

https://github.com/Ximerm/ecobuildlab-backend

---

## Licencia

Este proyecto se distribuye bajo la licencia MIT.

---

## Autora

**Ximena Rodríguez**

GitHub:

https://github.com/Ximerm
