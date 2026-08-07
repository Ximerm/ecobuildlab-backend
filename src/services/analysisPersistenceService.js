/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: analysisPersistenceService.js
 * --------------------------------------------------------------------
 * Servicio encargado de almacenar análisis bioclimáticos.
 *
 * Este módulo encapsula la lógica necesaria para asociar un análisis
 * con su propietario y persistirlo en la base de datos.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const analysisRepository = require("../repositories/analysisRepository");

// ==============================
// Funciones públicas
// ==============================

/**
 * Guarda un análisis bioclimático.
 *
 * @param {Object} analysis Análisis generado.
 * @param {String} ownerId Identificador del usuario.
 * @returns {Promise<Object>}
 */
async function saveAnalysis(analysis, ownerId) {
  return analysisRepository.create({
    owner: ownerId,
    ...analysis,
  });
}

// ==============================
// Exportaciones
// ==============================

module.exports = {
  saveAnalysis,
};
