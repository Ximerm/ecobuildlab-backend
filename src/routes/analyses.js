/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: analyses.js
 * --------------------------------------------------------------------
 * Define las rutas relacionadas con los análisis bioclimáticos.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const express = require("express");

const {
  generateAnalysis,
  saveAnalysis,
  getAnalyses,
  getAnalysisById,
  deleteAnalysis,
} = require("../controllers/analysisController");

const auth = require("../middlewares/auth");

const {
  generateAnalysisValidation,
  saveAnalysisValidation,
  analysisIdValidation,
} = require("../validations/analysisValidation");

// ==============================
// Configuración
// ==============================

const router = express.Router();

// ==============================
// Middleware de autenticación
// ==============================

router.use(auth);

// ==============================
// Rutas protegidas
// ==============================

/**
 * Genera un análisis climático para el usuario autenticado.
 */
router.post("/generate", generateAnalysisValidation, generateAnalysis);

/**
 * Guarda un análisis.
 */
router.post("/", saveAnalysisValidation, saveAnalysis);

/**
 * Obtiene los análisis del usuario autenticado.
 */
router.get("/", getAnalyses);

/**
 * Obtiene un análisis por id.
 */
router.get("/:id", analysisIdValidation, getAnalysisById);

/**
 * Elimina un análisis.
 */
router.delete("/:id", analysisIdValidation, deleteAnalysis);

// ==============================
// Exportaciones
// ==============================

module.exports = router;
