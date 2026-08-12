/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: userController.js
 * --------------------------------------------------------------------
 * Controlador encargado de gestionar las solicitudes HTTP
 * relacionadas con los usuarios.
 *
 * Este módulo recibe las solicitudes del cliente, delega la lógica
 * de negocio a los servicios correspondientes y construye la respuesta
 * HTTP.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const authService = require('../services/authService');

const STATUS_CODES = require('../constants/statusCodes');

const MESSAGES = require('../constants/messages');

const NotFoundError = require('../errors/NotFoundError');

// ==============================
// Funciones públicas
// ==============================

/**
 * Registra un nuevo usuario.
 *
 * @param {Object} req Solicitud HTTP.
 * @param {Object} res Respuesta HTTP.
 * @param {Function} next Middleware para manejo de errores.
 */
async function signup(req, res, next) {
  try {
    const user = await authService.signup(req.body);

    res.status(STATUS_CODES.CREATED).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Inicia sesión de un usuario registrado.
 *
 * @param {Object} req Solicitud HTTP.
 * @param {Object} res Respuesta HTTP.
 * @param {Function} next Middleware para manejo de errores.
 */
async function signin(req, res, next) {
  try {
    const token = await authService.signin(req.body);

    res.status(STATUS_CODES.OK).json(token);
  } catch (error) {
    next(error);
  }
}

/**
 * Obtiene la información del usuario autenticado.
 *
 * @param {Object} req Solicitud HTTP.
 * @param {Object} res Respuesta HTTP.
 * @param {Function} next Middleware para manejo de errores.
 */
async function getCurrentUser(req, res, next) {
  try {
    const user = await authService.getCurrentUser(req.user._id);

    if (!user) {
      throw new NotFoundError(MESSAGES.USER_NOT_FOUND);
    }

    res.status(STATUS_CODES.OK).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
}

// ==============================
// Exportaciones
// ==============================

module.exports = {
  signup,
  signin,
  getCurrentUser,
};
