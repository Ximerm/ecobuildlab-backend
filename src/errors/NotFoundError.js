/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: NotFoundError.js
 * --------------------------------------------------------------------
 * Error utilizado cuando el recurso solicitado no existe.
 * --------------------------------------------------------------------
 */

const STATUS_CODES = require('../constants/statusCodes');

class NotFoundError extends Error {
  constructor(message) {
    super(message);

    this.statusCode = STATUS_CODES.NOT_FOUND;
  }
}

module.exports = NotFoundError;
