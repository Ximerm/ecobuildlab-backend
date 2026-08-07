/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: ForbiddenError.js
 * --------------------------------------------------------------------
 * Error utilizado cuando el usuario autenticado no tiene permisos
 * para realizar la operación solicitada.
 * --------------------------------------------------------------------
 */

const STATUS_CODES = require("../constants/statusCodes");

class ForbiddenError extends Error {
  constructor(message) {
    super(message);

    this.statusCode = STATUS_CODES.FORBIDDEN;
  }
}

module.exports = ForbiddenError;
