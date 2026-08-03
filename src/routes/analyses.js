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

// ==============================
// Configuración
// ==============================

const router = express.Router();

// ==============================
// Rutas públicas
// ==============================

/**
 * Genera un análisis climático.
 *
 * No requiere autenticación.
 */
router.post("/generate", generateAnalysis);

// ==============================
// Middleware de autenticación
// ==============================

router.use(auth);

// ==============================
// Rutas protegidas
// ==============================

/**
 * Guarda un análisis.
 */
router.post("/", saveAnalysis);

/**
 * Obtiene los análisis del usuario autenticado.
 */
router.get("/", getAnalyses);

/**
 * Obtiene un análisis por id.
 */
router.get("/:id", getAnalysisById);

/**
 * Elimina un análisis.
 */
router.delete("/:id", deleteAnalysis);

// ==============================
// Exportaciones
// ==============================

module.exports = router;
