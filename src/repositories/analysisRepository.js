/**
 *
 * ---
 * EcoBuildLab
 * Archivo: analysisRepository.js
 *
 * ---
 * Repositorio encargado de gestionar la persistencia de los análisis
 * bioclimáticos en la base de datos.
 *
 * Este módulo encapsula las operaciones de acceso al modelo Analysis,
 * aislando la lógica de persistencia del resto de la aplicación.
 *
 *
 * ---
 *
 */

// ==============================
// Dependencias
// ==============================

const Analysis = require('../models/analysis');

// ==============================
// Funciones públicas
// ==============================

/**
 *
 * Crea un nuevo análisis bioclimático.
 *
 * @param {Object} data Información del análisis.
 * @returns {Promise} Análisis creado.
 */
async function create(data) {
  return Analysis.create(data);
}

/**
 *
 * Obtiene todos los análisis pertenecientes a un usuario.
 *
 * Los resultados se ordenan desde el más recientemente
 * creado o actualizado hasta el más antiguo.
 *
 * @param {String} ownerId Identificador del usuario.
 * @returns {Promise} Lista de análisis.
 */
async function findByOwner(ownerId) {
  return Analysis.find({
    owner: ownerId,
  }).sort({
    updatedAt: -1,
  });
}

/**
 *
 * Obtiene un análisis por su identificador.
 *
 * @param {String} id Identificador del análisis.
 * @returns {Promise<Object|null>} Análisis encontrado o null.
 */
async function findById(id) {
  return Analysis.findById(id);
}

/**
 *
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
 *
 * Busca un análisis existente para una ubicación y usuario determinados.
 *
 * La comparación de ciudad y país se realiza sin distinguir
 * mayúsculas y minúsculas.
 *
 * @param {String} city Nombre de la ciudad.
 * @param {String} country Nombre del país.
 * @param {String} ownerId Identificador del usuario.
 * @returns {Promise<Object|null>} Análisis encontrado o null.
 */
async function findByLocationAndOwner(city, country, ownerId) {
  return Analysis.findOne({
    owner: ownerId,
    'location.city': {
      $regex: `^${city.trim()}$`,
      $options: 'i',
    },
    'location.country': {
      $regex: `^${country.trim()}$`,
      $options: 'i',
    },
  });
}

/**
 *
 * Actualiza un análisis perteneciente a un usuario.
 *
 * El propietario se conserva y únicamente se reemplaza
 * la información correspondiente al análisis.
 *
 * @param {String} id Identificador del análisis.
 * @param {String} ownerId Identificador del usuario.
 * @param {Object} data Nuevos datos del análisis.
 * @returns {Promise<Object|null>} Análisis actualizado o null.
 */
async function updateByIdAndOwner(id, ownerId, data) {
  return Analysis.findOneAndUpdate(
    {
      _id: id,
      owner: ownerId,
    },
    {
      $set: data,
    },
    {
      new: true,
      runValidators: true,
    },
  );
}

/**
 *
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
  findByLocationAndOwner,
  updateByIdAndOwner,
  deleteById,
};
