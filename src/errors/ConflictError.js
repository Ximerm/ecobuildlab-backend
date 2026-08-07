/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: ConflictError.js
 * --------------------------------------------------------------------
 * Error utilizado cuando se produce un conflicto con un recurso
 * existente.
 * --------------------------------------------------------------------
 */

const STATUS_CODES = require("../constants/statusCodes");

class ConflictError extends Error {
  constructor(message) {
    super(message);

    this.statusCode = STATUS_CODES.CONFLICT;
  }
}

module.exports = ConflictError;
