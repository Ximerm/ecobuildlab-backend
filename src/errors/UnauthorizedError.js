/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: UnauthorizedError.js
 * --------------------------------------------------------------------
 * Error utilizado cuando el usuario no está autenticado
 * o las credenciales son inválidas.
 * --------------------------------------------------------------------
 */

const STATUS_CODES = require('../constants/statusCodes');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);

    this.statusCode = STATUS_CODES.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
