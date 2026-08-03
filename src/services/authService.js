/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: authService.js
 * --------------------------------------------------------------------
 * Servicio encargado de gestionar la autenticación de los usuarios.
 *
 * Este módulo implementa el registro y el inicio de sesión,
 * encapsulando la lógica relacionada con credenciales,
 * contraseñas y tokens JWT.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const userRepository = require("../repositories/userRepository");

const UnauthorizedError = require("../errors/UnauthorizedError");

const MESSAGES = require("../constants/messages");

const { JWT_SECRET, TOKEN_EXPIRATION } = require("../config/auth");

// ==============================
// Funciones públicas
// ==============================

/**
 * Registra un nuevo usuario.
 *
 * La contraseña se almacena en forma de hash antes
 * de persistirse en la base de datos.
 *
 * @param {Object} data Información del usuario.
 * @returns {Promise<Object>} Usuario creado.
 */
async function signup(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return userRepository.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });
}

/**
 * Autentica un usuario registrado.
 *
 * Verifica que el correo exista, valida la contraseña
 * y genera un token JWT para futuras solicitudes.
 *
 * @param {Object} credentials Credenciales del usuario.
 * @returns {Promise<Object>} Token JWT.
 */
async function signin(credentials) {
  const user = await userRepository.findByEmail(credentials.email);

  if (!user) {
    throw new UnauthorizedError(MESSAGES.INVALID_CREDENTIALS);
  }

  const passwordMatches = await bcrypt.compare(
    credentials.password,
    user.password,
  );

  if (!passwordMatches) {
    throw new UnauthorizedError(MESSAGES.INVALID_CREDENTIALS);
  }

  const token = jwt.sign(
    {
      _id: user._id,
    },
    JWT_SECRET,
    {
      expiresIn: TOKEN_EXPIRATION,
    },
  );

  return { token };
}

/**
 * Obtiene la información del usuario autenticado.
 *
 * @param {String} userId Identificador del usuario.
 * @returns {Promise<Object>}
 */
async function getCurrentUser(userId) {
  return userRepository.findById(userId);
}

// ==============================
// Exportaciones
// ==============================

module.exports = {
  signup,
  signin,
  getCurrentUser,
};
