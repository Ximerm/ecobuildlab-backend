/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: strategyMetricSelectors.js
 * --------------------------------------------------------------------
 * Funciones selectoras para acceder a las métricas climáticas
 * utilizadas por el motor de recomendaciones.
 *
 * Los selectores permiten obtener las métricas climáticas desde
 * la estructura de análisis generada por el backend.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const { CLIMATE_METRICS } = require('./strategyConstants');

// ==============================
// Selectores de métricas
// ==============================

const strategyMetricSelectors = Object.freeze({
  [CLIMATE_METRICS.AVERAGE_TEMPERATURE]: (analysis) => analysis.statistics.temperature.annual.mean,

  [CLIMATE_METRICS.MAX_TEMPERATURE]: (analysis) => analysis.statistics.temperature.annual.maximum,

  [CLIMATE_METRICS.MIN_TEMPERATURE]: (analysis) => analysis.statistics.temperature.annual.minimum,

  [CLIMATE_METRICS.RELATIVE_HUMIDITY]: (analysis) => analysis.statistics.humidity.annual.mean,

  [CLIMATE_METRICS.AVERAGE_WIND_SPEED]: (analysis) => analysis.statistics.wind.annual.speed.mean,

  [CLIMATE_METRICS.SOLAR_RADIATION]: (analysis) => analysis.statistics.solarIrradiation.annual.mean,

  [CLIMATE_METRICS.ANNUAL_PRECIPITATION]: (a) => a.statistics.precipitation.annual.total,
});

// ==============================
// Funciones públicas
// ==============================

/**
 * Obtiene el valor correspondiente a una métrica climática.
 *
 * @param {string} metric Código de la métrica climática.
 * @param {Object} analysis Análisis climático.
 * @returns {number|null} Valor de la métrica.
 */

function getMetricValue(metric, analysis) {
  const selector = strategyMetricSelectors[metric];

  if (!selector) {
    throw new Error(
      `No existe un selector definido para la métrica climática: ${metric}.`,
    );
  }

  return selector(analysis);
}

// ==============================
// Exportaciones
// ==============================

module.exports = {
  strategyMetricSelectors,
  getMetricValue,
};
