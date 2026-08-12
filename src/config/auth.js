/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: auth.js
 * --------------------------------------------------------------------
 * Configuración relacionada con la autenticación y autorización.
 *
 * Centraliza los parámetros utilizados para la generación y
 * verificación de tokens JWT, así como la configuración del
 * almacenamiento seguro de contraseñas.
 * --------------------------------------------------------------------
 */

// ==============================
// Configuración JWT
// ==============================

/**
 * Clave utilizada para firmar los tokens JWT.
 *
 * En producción se obtiene desde las variables de entorno.
 * En desarrollo se utiliza una clave local para facilitar
 * las pruebas sin necesidad de un archivo .env.
 */
const JWT_SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret';

/**
 * Tiempo de expiración del token JWT.
 */
const TOKEN_EXPIRATION = '7d';

// ==============================
// Configuración de contraseñas
// ==============================

/**
 * Número de rondas utilizadas por bcrypt para generar
 * el hash de las contraseñas.
 */
const SALT_ROUNDS = 10;

// ==============================
// Exportaciones
// ==============================

module.exports = {
  JWT_SECRET,
  TOKEN_EXPIRATION,
  SALT_ROUNDS,
};
