/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: errorHandler.js
 * --------------------------------------------------------------------
 * Middleware encargado de manejar de forma centralizada los errores
 * de la aplicación.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const STATUS_CODES = require('../constants/statusCodes');

const MESSAGES = require('../constants/messages');

const { applicationLogger } = require('../logger/logger');

// ==============================
// Funciones públicas
// ==============================

/**
 * Middleware global para el manejo de errores.
 *
 * @param {Error} error Error capturado.
 * @param {Object} req Solicitud HTTP.
 * @param {Object} res Respuesta HTTP.
 * @param {Function} next Middleware siguiente.
 */
function errorHandler(error, req, res, next) {
  applicationLogger.error('Unhandled application error.', {
    error: error.message,
    stack: error.stack,
  });

  if (res.headersSent) {
    return next(error);
  }

  // Error de correo electrónico duplicado
  if (error.code === 11000) {
    return res.status(STATUS_CODES.CONFLICT).json({
      message: MESSAGES.EMAIL_ALREADY_EXISTS,
    });
  }

  // Errores personalizados
  if (error.statusCode) {
    const response = {
      message: error.message,
    };

    // Conserva el identificador del análisis existente
    // cuando se produce un conflicto por ubicación duplicada.
    if (error.analysisId) {
      response.analysisId = error.analysisId;
    }

    return res.status(error.statusCode).json(response);
  }

  // Error inesperado
  return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    message: MESSAGES.INTERNAL_SERVER_ERROR,
  });
}

// ==============================
// Exportaciones
// ==============================

module.exports = errorHandler;
