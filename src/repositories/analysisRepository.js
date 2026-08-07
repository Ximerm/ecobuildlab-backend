/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: analysisRepository.js
 * --------------------------------------------------------------------
 * Repositorio encargado de gestionar la persistencia de los análisis
 * bioclimáticos en la base de datos.
 *
 * Este módulo encapsula las operaciones de acceso al modelo Analysis,
 * aislando la lógica de persistencia del resto de la aplicación.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const Analysis = require("../models/analysis");

// ==============================
// Funciones públicas
// ==============================

/**
 * Crea un nuevo análisis bioclimático.
 *
 * @param {Object} data Información del análisis.
 * @returns {Promise<Object>} Análisis creado.
 */
async function create(data) {
  return Analysis.create(data);
}

/**
 * Obtiene todos los análisis pertenecientes a un usuario.
 *
 * Los resultados se ordenan desde el más reciente
 * hasta el más antiguo.
 *
 * @param {String} ownerId Identificador del usuario.
 * @returns {Promise<Array>} Lista de análisis.
 */
async function findByOwner(ownerId) {
  return Analysis.find({
    owner: ownerId,
  }).sort({
    createdAt: -1,
  });
}

/**
 * Obtiene un análisis por su identificador.
 *
 * @param {String} id Identificador del análisis.
 * @returns {Promise<Object|null>} Análisis encontrado o null.
 */
async function findById(id) {
  return Analysis.findById(id);
}

/**
 * Obtiene un análisis perteneciente a un usuario.
 *
 * @param {String} id Identificador del análisis.
 * @param {String} ownerId Identificador del usuario.
 * @returns {Promise<Object|null>}
 */
async function findByIdAndOwner(id, ownerId) {
  return Analysis.findOne({
    _id: id,
    owner: ownerId,
  });
}

/**
 * Elimina un análisis por su identificador.
 *
 * @param {String} id Identificador del análisis.
 * @returns {Promise<Object|null>}
 */
async function deleteById(id) {
  return Analysis.findByIdAndDelete(id);
}

// ==============================
// Exportaciones
// ==============================

module.exports = {
  create,
  findByOwner,
  findById,
  findByIdAndOwner,
  deleteById,
};
