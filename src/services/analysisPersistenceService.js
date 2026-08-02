/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: analysisPersistenceService.js
 * --------------------------------------------------------------------
 * Servicio encargado de almacenar los análisis bioclimáticos.
 *
 * Este módulo encapsula la persistencia de los análisis,
 * delegando el acceso a la base de datos al repositorio.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const analysisRepository = require("./analysisRepository");

// ==============================
// Funciones públicas
// ==============================

/**
 * Guarda un análisis bioclimático.
 *
 * @param {Object} analysis Análisis generado.
 * @returns {Promise<Object>} Análisis almacenado.
 */
async function saveAnalysis(analysis) {
  return analysisRepository.create(analysis);
}

// ==============================
// Exportaciones
// ==============================

module.exports = {
  saveAnalysis,
};
