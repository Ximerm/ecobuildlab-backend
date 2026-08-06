/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: messages.js
 * --------------------------------------------------------------------
 * Mensajes utilizados por la aplicación para respuestas HTTP
 * y manejo centralizado de errores.
 * --------------------------------------------------------------------
 */

module.exports = {
  // Authentication
  AUTHORIZATION_REQUIRED: "Authorization required.",
  INVALID_TOKEN: "Invalid token.",
  INVALID_CREDENTIALS: "Invalid email or password.",

  // Users
  USER_NOT_FOUND: "User not found.",
  EMAIL_ALREADY_EXISTS: "Email already exists.",

  // Analyses
  ANALYSIS_NOT_FOUND: "Analysis not found.",
  ANALYSIS_DELETED: "Analysis deleted successfully.",

  // General
  FORBIDDEN: "You do not have permission to perform this action.",
  INTERNAL_SERVER_ERROR: "Internal server error.",
};
