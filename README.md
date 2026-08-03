# EcoBuildLab Backend

Backend API for EcoBuildLab, a web application that generates climate analyses and passive bioclimatic design recommendations.

---

## Features

- User registration and authentication with JWT
- Secure password hashing using bcrypt
- Protected routes
- Generate climate analyses
- Save analyses for authenticated users
- Retrieve saved analyses
- Delete saved analyses
- Request validation using Celebrate/Joi
- Centralized error handling
- Request and error logging
- Rate limiting
- Security headers with Helmet

---

## Technologies

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Celebrate
- Joi
- Helmet
- Winston
- Express Rate Limit

---

## Installation

Clone the repository

```bash
git clone https://github.com/Ximerm/ecobuildlab-backend.git
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Run production server

```bash
npm start
```

---

## Environment Variables

Create a `.env` file:

```text
NODE_ENV=production

DATABASE_URI=<your mongodb uri>

JWT_SECRET=<your secret key>
```

For development, the project works without a `.env` file.

---

## API Endpoints

### Authentication

POST `/api/signup`

POST `/api/signin`

GET `/api/users/me`

### Climate Analyses

POST `/api/analyses/generate`

POST `/api/analyses`

GET `/api/analyses`

GET `/api/analyses/:id`

DELETE `/api/analyses/:id`

---

## Project Structure

```text
src
│
├── config
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

## Deployment

API URL

> (Add Render URL after deployment)

---

## Author

Ximena Rodríguez
