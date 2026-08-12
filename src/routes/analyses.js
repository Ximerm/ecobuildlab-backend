/**
 *
 * ---
 * EcoBuildLab
 * Archivo: analyses.js
 *
 * ---
 * Define las rutas relacionadas con los análisis bioclimáticos.
 *
 * ---
 *
 */

// ==============================
// Dependencias
// ==============================

const express = require('express');

const {
  generateAnalysis,
  saveAnalysis,
  replaceAnalysis,
  getAnalyses,
  getAnalysisById,
  deleteAnalysis,
} = require('../controllers/analysisController');

const auth = require('../middlewares/auth');

const {
  generateAnalysisValidation,
  saveAnalysisValidation,
  analysisIdValidation,
} = require('../validations/analysisValidation');

// ==============================
// Configuración
// ==============================

const router = express.Router();

// ==============================
// Generación de análisis
// ==============================

/**
 *
 * Genera un análisis climático.
 *
 * Esta ruta es pública porque el usuario puede
 * consultar las condiciones climáticas de una
 * ubicación sin necesidad de iniciar sesión.
 */
router.post('/generate', generateAnalysisValidation, generateAnalysis);

// ==============================
// Rutas protegidas
// ==============================

router.post('/', auth, saveAnalysisValidation, saveAnalysis);

router.get('/', auth, getAnalyses);

router.get('/:id', auth, analysisIdValidation, getAnalysisById);

router.patch(
  '/:id',
  auth,
  analysisIdValidation,
  saveAnalysisValidation,
  replaceAnalysis,
);

router.delete('/:id', auth, analysisIdValidation, deleteAnalysis);

// ==============================
// Exportaciones
// ==============================

module.exports = router;
