/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: analysisService.js
 * --------------------------------------------------------------------
 * Servicio encargado de gestionar los análisis bioclimáticos
 * almacenados en la base de datos.
 *
 * Este módulo actúa como intermediario entre los controladores
 * y el modelo Analysis, encapsulando las operaciones de acceso
 * a la información.
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
async function createAnalysis(data) {
  return Analysis.create(data);
}

/**
 * Obtiene todos los análisis registrados.
 *
 * Los resultados se ordenan desde el más reciente
 * hasta el más antiguo.
 *
 * @returns {Promise<Array>} Lista de análisis.
 */
async function getAnalyses() {
  return Analysis.find().sort({ createdAt: -1 });
}

/**
 * Obtiene un análisis por su identificador.
 *
 * @param {String} id Identificador del análisis.
 * @returns {Promise<Object|null>} Análisis encontrado o null.
 */
async function getAnalysisById(id) {
  return Analysis.findById(id);
}

// ==============================
// Exportaciones
// ==============================

module.exports = {
  createAnalysis,
  getAnalyses,
  getAnalysisById,
};
