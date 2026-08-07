/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: app.js
 * --------------------------------------------------------------------
 * Configuración principal de la aplicación Express.
 *
 * Este módulo inicializa la aplicación, establece la conexión con
 * la base de datos, registra los middlewares y configura las rutas
 * generales del servidor y de la API.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const express = require("express");

const helmet = require("helmet");

const { errors } = require("celebrate");

const connectDB = require("./config/database");

const rateLimiter = require("./config/rateLimiter");

const { getHome } = require("./controllers/mainController");

const routes = require("./routes");

const errorHandler = require("./middlewares/errorHandler");

const { requestLogger, errorLogger } = require("./logger/logger");

// ==============================
// Configuración de la aplicación
// ==============================

const app = express();

app.set("trust proxy", 1);

// ==============================
// Inicialización
// ==============================

connectDB();

// ==============================
// Middlewares
// ==============================

/**
 * Agrega encabezados HTTP de seguridad.
 */
app.use(helmet());

/**
 * Limita el número de solicitudes HTTP por dirección IP
 * para proteger la API frente a abuso o ataques.
 */
app.use(rateLimiter);

/**
 * Middleware para procesar solicitudes con cuerpo JSON.
 */
app.use(express.json());

/**
 * Registra todas las solicitudes HTTP.
 */
app.use(requestLogger);

// ==============================
// Rutas
// ==============================

/**
 * Página principal del servidor.
 */
app.get("/", getHome);

/**
 * Rutas de la API.
 */
app.use("/api", routes);

// ==============================
// Manejo de errores
// ==============================

/**
 * Maneja errores de validación generados por Celebrate.
 */
app.use(errors());

/**
 * Registra todos los errores.
 */
app.use(errorLogger);

/**
 * Middleware global de manejo de errores.
 */
app.use(errorHandler);

// ==============================
// Exportaciones
// ==============================

module.exports = app;
