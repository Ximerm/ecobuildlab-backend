/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: auth.js
 * --------------------------------------------------------------------
 * Middleware encargado de verificar la autenticación mediante JWT.
 *
 * Este módulo valida el token enviado por el cliente y almacena
 * la información del usuario autenticado en req.user para que pueda
 * ser utilizada por los controladores posteriores.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/auth');

const MESSAGES = require('../constants/messages');

const UnauthorizedError = require('../errors/UnauthorizedError');

// ==============================
// Funciones públicas
// ==============================

/**
 * Verifica el token JWT enviado por el cliente.
 *
 * El token debe enviarse mediante el encabezado:
 *
 * Authorization: Bearer <token>
 *
 * @param {Object} req Solicitud HTTP.
 * @param {Object} res Respuesta HTTP.
 * @param {Function} next Middleware siguiente.
 */
function auth(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return next(new UnauthorizedError(MESSAGES.AUTHORIZATION_REQUIRED));
    }

    const token = authorization.replace('Bearer ', '');

    req.user = jwt.verify(token, JWT_SECRET);

    return next();
  } catch {
    return next(new UnauthorizedError(MESSAGES.INVALID_TOKEN));
  }
}

// ==============================
// Exportaciones
// ==============================

module.exports = auth;
