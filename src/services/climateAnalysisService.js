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
Actualmente integra:
- Estadísticas anuales
- Análisis mensual
- Clasificación climática (Caldas-Lang)
- Rosa de los vientos

En futuras versiones incorporará:
- Generación de estrategias bioclimáticas
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const { calculateStatistics } = require("./climateAnalysis/statistics");

const { calculateMonthlyAnalysis } = require("./climateAnalysis/monthly");

const { classifyClimate } = require("./climateAnalysis/caldasLang");

const { calculateWindRose } = require("./climateAnalysis/windRose");

// ==============================
// Funciones públicas
// ==============================

/**
 * Ejecuta el análisis climático completo.
 *
 * @param {Object} hourly Datos horarios obtenidos desde Open-Meteo.
 * @returns {Object} Resultado del análisis climático.
 */

function analyzeClimate(hourly) {
  const statistics = calculateStatistics(hourly);

  const monthly = calculateMonthlyAnalysis(hourly);

  const classification = classifyClimate(statistics);

  const windRose = calculateWindRose(hourly);

  // Se incorporará en próximas versiones.
  const strategies = [];

  return {
    statistics,

    monthly,

    classification,

    windRose,

    strategies,
  };
}

// ==============================
// Exportaciones
// ==============================

module.exports = {
  analyzeClimate,
};
