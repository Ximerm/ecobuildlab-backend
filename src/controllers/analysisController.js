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

const analysisPersistenceService = require("../services/analysisPersistenceService");

const analysisRepository = require("../repositories/analysisRepository");

const STATUS_CODES = require("../constants/statusCodes");

const MESSAGES = require("../constants/messages");

const NotFoundError = require("../errors/NotFoundError");

// ==============================
// Funciones públicas
// ==============================

/**
 * Genera un análisis bioclimático.
 *
 * No almacena información en la base de datos.
 *
 * @param {Object} req Solicitud HTTP.
 * @param {Object} res Respuesta HTTP.
 * @param {Function} next Middleware para manejo de errores.
 */
async function generateAnalysis(req, res, next) {
  try {
    const analysis = await analysisGenerationService.generateAnalysis(req.body);

    res.status(STATUS_CODES.OK).json(analysis);
  } catch (error) {
    next(error);
  }
}

/**
 * Guarda un análisis generado previamente.
 *
 * El análisis queda asociado al usuario autenticado.
 *
 * @param {Object} req Solicitud HTTP.
 * @param {Object} res Respuesta HTTP.
 * @param {Function} next Middleware para manejo de errores.
 */
async function saveAnalysis(req, res, next) {
  try {
    const analysis = await analysisPersistenceService.saveAnalysis(
      req.body,
      req.user._id,
    );

    res.status(STATUS_CODES.CREATED).json(analysis);
  } catch (error) {
    next(error);
  }
}

/**
 * Obtiene todos los análisis del usuario autenticado.
 *
 * @param {Object} req Solicitud HTTP.
 * @param {Object} res Respuesta HTTP.
 * @param {Function} next Middleware para manejo de errores.
 */
async function getAnalyses(req, res, next) {
  try {
    const analyses = await analysisRepository.findByOwner(req.user._id);

    res.status(STATUS_CODES.OK).json(analyses);
  } catch (error) {
    next(error);
  }
}

/**
 * Obtiene un análisis por su identificador.
 *
 * @param {Object} req Solicitud HTTP.
 * @param {Object} res Respuesta HTTP.
 * @param {Function} next Middleware para manejo de errores.
 */
async function getAnalysisById(req, res, next) {
  try {
    const analysis = await analysisRepository.findByIdAndOwner(
      req.params.id,
      req.user._id,
    );

    if (!analysis) {
      throw new NotFoundError(MESSAGES.ANALYSIS_NOT_FOUND);
    }

    res.status(STATUS_CODES.OK).json(analysis);
  } catch (error) {
    next(error);
  }
}

/**
 * Elimina un análisis del usuario autenticado.
 *
 * @param {Object} req Solicitud HTTP.
 * @param {Object} res Respuesta HTTP.
 * @param {Function} next Middleware para manejo de errores.
 */
async function deleteAnalysis(req, res, next) {
  try {
    const analysis = await analysisRepository.findByIdAndOwner(
      req.params.id,
      req.user._id,
    );

    if (!analysis) {
      throw new NotFoundError(MESSAGES.ANALYSIS_NOT_FOUND);
    }

    await analysisRepository.deleteById(analysis._id);

    res.status(STATUS_CODES.OK).json({
      message: MESSAGES.ANALYSIS_DELETED,
    });
  } catch (error) {
    next(error);
  }
}

// ==============================
// Exportaciones
// ==============================

module.exports = {
  generateAnalysis,
  saveAnalysis,
  getAnalyses,
  getAnalysisById,
  deleteAnalysis,
};
