/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: userValidation.js
 * --------------------------------------------------------------------
 * Esquemas de validación para las solicitudes relacionadas con
 * usuarios.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const { celebrate, Joi, Segments } = require('celebrate');

// ==============================
// Validaciones
// ==============================

/**
 * Valida el registro de usuarios.
 */
const validateSignup = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),

    email: Joi.string().email().required(),

    password: Joi.string().min(6).required(),
  }),
});

/**
 * Valida el inicio de sesión.
 */
const validateSignin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),

    password: Joi.string().required(),
  }),
});

// ==============================
// Exportaciones
// ==============================

module.exports = {
  validateSignup,
  validateSignin,
};
