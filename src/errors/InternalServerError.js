/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: InternalServerError.js
 * --------------------------------------------------------------------
 * Error utilizado cuando ocurre un fallo inesperado
 * durante el procesamiento de una solicitud.
 * --------------------------------------------------------------------
 */

const STATUS_CODES = require("../constants/statusCodes");

const MESSAGES = require("../constants/messages");

class InternalServerError extends Error {
  constructor(message = MESSAGES.INTERNAL_SERVER_ERROR) {
    super(message);

    this.statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR;
  }
}

module.exports = InternalServerError;
