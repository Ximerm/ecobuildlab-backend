/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: index.js
 * --------------------------------------------------------------------
 * Define las rutas principales de la API.
 *
 * Este módulo centraliza el registro de los recursos disponibles y
 * delega la gestión de cada uno a su router correspondiente.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const express = require("express");

const analysesRouter = require("./analyses");

// ==============================
// Configuración del router
// ==============================

const router = express.Router();

// ==============================
// Rutas
// ==============================

/**
 * Rutas relacionadas con los análisis bioclimáticos.
 */
router.use("/analyses", analysesRouter);

// ==============================
// Exportaciones
// ==============================

module.exports = router;
