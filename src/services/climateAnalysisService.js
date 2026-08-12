/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: climateAnalysisService.js
 * --------------------------------------------------------------------
 * Orquesta el proceso completo de análisis climático.
 *
 * Este servicio coordina los diferentes módulos especializados
 * encargados de procesar la información climática obtenida desde
 * Open-Meteo.
 *
 * Integra:
 * - Estadísticas anuales
 * - Análisis mensual
 * - Clasificación climática (Caldas-Lang)
 * - Rosa de los vientos
 * - Generación de estrategias bioclimáticas
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const { calculateStatistics } = require('./climateAnalysis/statistics');

const { calculateMonthlyAnalysis } = require('./climateAnalysis/monthly');

const { classifyClimate } = require('./climateAnalysis/caldasLang');

const { calculateWindRose } = require('./climateAnalysis/windRose');

const { generateStrategies } = require('./strategy/strategyGenerator');

// ==============================
// Funciones públicas
// ==============================

/**
 * Ejecuta el análisis climático completo.
 *
 * Flujo:
 * 1. Calcula las estadísticas climáticas.
 * 2. Realiza el análisis mensual.
 * 3. Clasifica el clima mediante Caldas-Lang.
 * 4. Calcula la rosa de los vientos.
 * 5. Genera las estrategias bioclimáticas.
 *
 * @param {Object} hourly Datos horarios obtenidos desde Open-Meteo.
 * @returns {Object} Resultado completo del análisis climático.
 */

function analyzeClimate(hourly, daily) {
  // ==============================
  // Análisis climático
  // ==============================

  const statistics = calculateStatistics(hourly, daily);

  const monthly = calculateMonthlyAnalysis(hourly);

  const classification = classifyClimate(statistics);

  const windRose = calculateWindRose(hourly);

  // ==============================
  // Análisis base
  // ==============================

  /**
   * Se construye el objeto de análisis antes de generar
   * las estrategias para que el motor pueda acceder a:
   *
   * - statistics
   * - classification.thermalZone
   * - classification.moistureZone
   *
   * La estructura completa de clasificación se utiliza
   * internamente para evaluar las condiciones de las
   * recomendaciones.
   */

  const analysis = {
    statistics,
    monthly,
    classification,
    windRose,
  };

  // ==============================
  // Estrategias bioclimáticas
  // ==============================

  const strategies = generateStrategies(analysis);

  // ==============================
  // Resultado
  // ==============================

  return {
    ...analysis,
    strategies,
  };
}

// ==============================
// Exportaciones
// ==============================

module.exports = {
  analyzeClimate,
};
