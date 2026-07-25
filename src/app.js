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

const connectDB = require("./config/database");
const { getHome } = require("./controllers/mainController");
const routes = require("./routes");

// ==============================
// Configuración de la aplicación
// ==============================

const app = express();

// ==============================
// Inicialización
// ==============================

/**
 * Establece la conexión con la base de datos.
 */
connectDB();

// ==============================
// Middlewares
// ==============================

/**
 * Middleware para procesar solicitudes con cuerpo JSON.
 */
app.use(express.json());

// ==============================
// Rutas
// ==============================

/**
 * Página principal del servidor.
 *
 * Se utiliza para verificar rápidamente que la aplicación
 * está en funcionamiento.
 */
app.get("/", getHome);

/**
 * Rutas de la API de EcoBuildLab.
 */
app.use("/api", routes);

// ==============================
// Exportaciones
// ==============================

module.exports = app;
