/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: auth.js
 * --------------------------------------------------------------------
 * Configuración utilizada por el sistema de autenticación.
 *
 * Durante el desarrollo se utiliza una clave local.
 * En producción la clave se obtiene desde las variables
 * de entorno.
 * --------------------------------------------------------------------
 */

// ==============================
// Configuración
// ==============================

const JWT_SECRET =
  process.env.NODE_ENV === "production" ? process.env.JWT_SECRET : "dev-secret";

const TOKEN_EXPIRATION = "7d";

// ==============================
// Exportaciones
// ==============================

module.exports = {
  JWT_SECRET,
  TOKEN_EXPIRATION,
};
