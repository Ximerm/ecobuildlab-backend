/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: userRepository.js
 * --------------------------------------------------------------------
 * Repositorio encargado de gestionar la persistencia de los usuarios
 * registrados en EcoBuildLab.
 *
 * Este módulo encapsula las operaciones de acceso al modelo User,
 * aislando la lógica de persistencia del resto de la aplicación.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const User = require("../models/user");

// ==============================
// Funciones públicas
// ==============================

/**
 * Crea un nuevo usuario.
 *
 * @param {Object} data Información del usuario.
 * @returns {Promise<Object>} Usuario creado.
 */
async function create(data) {
  return User.create(data);
}

/**
 * Busca un usuario por su correo electrónico.
 *
 * Incluye el campo password para permitir la autenticación.
 *
 * @param {String} email
 * @returns {Promise<Object|null>}
 */
async function findByEmail(email) {
  return User.findOne({ email }).select("+password");
}

/**
 * Busca un usuario por su identificador.
 *
 * @param {String} id
 * @returns {Promise<Object|null>}
 */
async function findById(id) {
  return User.findById(id);
}

// ==============================
// Exportaciones
// ==============================

module.exports = {
  create,
  findByEmail,
  findById,
};
