/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: analyses.js
 * --------------------------------------------------------------------
 * Define las rutas relacionadas con los análisis bioclimáticos.
 *
 * Este módulo asocia cada endpoint con el controlador encargado
 * de procesar la solicitud correspondiente.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const express = require("express");

const {
  createAnalysis,
  getAnalyses,
  getAnalysisById,
} = require("../controllers/analysisController");

// ==============================
// Configuración del router
// ==============================

const router = express.Router();

// ==============================
// Rutas
// ==============================

/**
 * POST /
 * Crea un nuevo análisis bioclimático.
 */
router.post("/", createAnalysis);

/**
 * GET /
 * Obtiene todos los análisis registrados.
 */
router.get("/", getAnalyses);

/**
 * GET /:id
 * Obtiene un análisis por su identificador.
 */
router.get("/:id", getAnalysisById);

// ==============================
// Exportaciones
// ==============================

module.exports = router;
