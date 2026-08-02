/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: analysisController.js
 * --------------------------------------------------------------------
 * Controlador encargado de gestionar las solicitudes HTTP relacionadas
 * con los análisis bioclimáticos.
 *
 * Este módulo recibe las solicitudes del cliente, delega la lógica
 * de negocio a los servicios correspondientes y construye la respuesta
 * HTTP.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const analysisGenerationService = require("../services/analysisGenerationService");

const analysisRepository = require("../repositories/analysisRepository");

// ==============================
// Constantes
// ==============================

const ANALYSIS_NOT_FOUND_MESSAGE = "Analysis not found.";

// ==============================
// Funciones públicas
// ==============================

/**
 * Genera un nuevo análisis bioclimático.
 *
 * @param {Object} req Solicitud HTTP.
 * @param {Object} res Respuesta HTTP.
 * @param {Function} next Middleware para manejo de errores.
 */
async function createAnalysis(req, res, next) {
  try {
    const analysis = await analysisGenerationService.generateAnalysis(req.body);

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
    const analyses = await analysisRepository.findAll();

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
    const analysis = await analysisRepository.findById(req.params.id);

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
