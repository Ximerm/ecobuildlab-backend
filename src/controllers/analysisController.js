/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: analysisController.js
 * --------------------------------------------------------------------
 * Controlador encargado de gestionar las solicitudes relacionadas
 * con los análisis bioclimáticos.
 *
 * Este módulo actúa como intermediario entre las rutas y el servicio
 * de análisis, procesando las peticiones HTTP y devolviendo la
 * respuesta correspondiente.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const analysisService = require("../services/analysisService");

// ==============================
// Constantes
// ==============================

const ANALYSIS_NOT_FOUND_MESSAGE = "Analysis not found.";

// ==============================
// Funciones públicas
// ==============================

/**
 * Crea un nuevo análisis.
 *
 * @param {Object} req Solicitud HTTP.
 * @param {Object} res Respuesta HTTP.
 * @param {Function} next Middleware para manejo de errores.
 */
async function createAnalysis(req, res, next) {
  try {
    const analysis = await analysisService.createAnalysis(req.body);

    res.status(201).json(analysis);
  } catch (error) {
    next(error);
  }
}

/**
 * Obtiene todos los análisis registrados.
 *
 * @param {Object} req Solicitud HTTP.
 * @param {Object} res Respuesta HTTP.
 * @param {Function} next Middleware para manejo de errores.
 */
async function getAnalyses(req, res, next) {
  try {
    const analyses = await analysisService.getAnalyses();

    res.json(analyses);
  } catch (error) {
    next(error);
  }
}

/**
 * Obtiene un análisis por su identificador.
 *
 * Si el análisis no existe se devuelve un error 404.
 *
 * @param {Object} req Solicitud HTTP.
 * @param {Object} res Respuesta HTTP.
 * @param {Function} next Middleware para manejo de errores.
 */
async function getAnalysisById(req, res, next) {
  try {
    const analysis = await analysisService.getAnalysisById(req.params.id);

    if (!analysis) {
      return res.status(404).json({
        message: ANALYSIS_NOT_FOUND_MESSAGE,
      });
    }

    res.json(analysis);
  } catch (error) {
    next(error);
  }
}

// ==============================
// Exportaciones
// ==============================

module.exports = {
  createAnalysis,
  getAnalyses,
  getAnalysisById,
};
