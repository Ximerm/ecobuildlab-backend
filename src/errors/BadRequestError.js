/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: BadRequestError.js
 * --------------------------------------------------------------------
 * Error utilizado cuando la solicitud enviada por el cliente
 * contiene información inválida.
 * --------------------------------------------------------------------
 */

const STATUS_CODES = require('../constants/statusCodes');

class BadRequestError extends Error {
  constructor(message) {
    super(message);

    this.statusCode = STATUS_CODES.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
