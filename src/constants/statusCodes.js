/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: statusCodes.js
 * --------------------------------------------------------------------
 * Códigos de estado HTTP utilizados por la aplicación.
 * --------------------------------------------------------------------
 */

module.exports = {
  // Success
  OK: 200,
  CREATED: 201,

  // Client errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,

  // Server errors
  INTERNAL_SERVER_ERROR: 500,
};
