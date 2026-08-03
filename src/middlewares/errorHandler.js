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

const STATUS_CODES = require("../constants/statusCodes");

const MESSAGES = require("../constants/messages");

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
  console.error(error);

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
    return res.status(error.statusCode).json({
      message: error.message,
    });
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
