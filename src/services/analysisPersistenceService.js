/**
 *
  ---
- EcoBuildLab
- Archivo: analysisPersistenceService.js
  ---
- Servicio encargado de almacenar análisis bioclimáticos.
-
- Este módulo encapsula la lógica necesaria para asociar un análisis
- con su propietario y persistirlo en la base de datos.
-
- También verifica si el usuario ya tiene un análisis guardado
- para la misma ciudad y país antes de crear uno nuevo.
  ---
 */

// ==============================
// Dependencias
// ==============================

const analysisRepository = require('../repositories/analysisRepository');

const ConflictError = require('../errors/ConflictError');

const MESSAGES = require('../constants/messages');

// ==============================
// Funciones públicas
// ==============================

/**
 *
 * Guarda un análisis bioclimático.
 *
 * Antes de crear el análisis, verifica si el usuario ya tiene
 * un análisis guardado para la misma ciudad y país.
 *
 * @param {Object} analysis Análisis generado.
 * @param {String} ownerId Identificador del usuario.
 * @returns {Promise} Análisis creado.
 */
async function saveAnalysis(analysis, ownerId) {
  const existingAnalysis = await analysisRepository.findByLocationAndOwner(
    analysis.location.city,
    analysis.location.country,
    ownerId,
  );

  if (existingAnalysis) {
    const error = new ConflictError(MESSAGES.ANALYSIS_ALREADY_EXISTS);

    error.analysisId = existingAnalysis._id;

    throw error;
  }

  return analysisRepository.create({
    owner: ownerId,
    ...analysis,
  });
}

/**
 *
 * Reemplaza un análisis existente.
 *
 * El análisis únicamente puede ser reemplazado por el usuario
 * propietario del mismo.
 *
 * @param {String} id Identificador del análisis.
 * @param {Object} analysis Nuevos datos del análisis.
 * @param {String} ownerId Identificador del usuario.
 * @returns {Promise<Object|null>} Análisis actualizado.
 */
async function replaceAnalysis(analysis, id, ownerId) {
  return analysisRepository.updateByIdAndOwner(id, ownerId, analysis);
}

// ==============================
// Exportaciones
// ==============================

module.exports = {
  saveAnalysis,
  replaceAnalysis,
};
