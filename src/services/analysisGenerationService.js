/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: analysisGenerationService.js
 * --------------------------------------------------------------------
 * Servicio encargado de generar un análisis bioclimático completo.
 *
 * Este módulo orquesta el flujo de generación del análisis,
 * coordinando los diferentes servicios especializados encargados
 * de obtener y procesar la información climática.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const { getLocation } = require('./geocodingService');

const { getHistoricalClimate } = require('./historicalClimateService');

const { analyzeClimate } = require('./climateAnalysisService');

// ==============================
// Funciones públicas
// ==============================

/**
 * Genera un análisis bioclimático completo.
 *
 * Flujo:
 * 1. Obtiene la ubicación geográfica.
 * 2. Descarga la información climática histórica.
 * 3. Ejecuta el análisis climático.
 * 4. Construye el análisis final.
 *
 * El servicio únicamente genera el análisis.
 * La persistencia se delega a otro servicio.
 *
 * @param {Object} data Información suministrada por el usuario.
 * @returns {Promise<Object>} Análisis generado.
 */
async function generateAnalysis(data) {
  // Obtener la ubicación geográfica
  const location = await getLocation(data);

  // Descargar información climática histórica
  const historicalClimate = await getHistoricalClimate(location);

  // Validar que existan datos horarios
  if (!historicalClimate.hourly) {
    throw new Error('Historical climate data not available.');
  }

  // Ejecutar el análisis climático
  const climateAnalysis = analyzeClimate(historicalClimate.hourly);

  // Construir el análisis final
  return {
    location,

    statistics: climateAnalysis.statistics,

    monthly: climateAnalysis.monthly,

    classification: climateAnalysis.classification.climate,

    windRose: climateAnalysis.windRose,

    strategies: climateAnalysis.strategies,
  };
}

// ==============================
// Exportaciones
// ==============================

module.exports = {
  generateAnalysis,
};
