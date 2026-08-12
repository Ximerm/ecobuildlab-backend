/**
 *
  ---
- EcoBuildLab
- Archivo: strategyImpact.js
-
  ---
- Calcula el impacto estimado de las estrategias bioclimáticas
- a partir de las métricas climáticas del análisis.
-
- Combina las métricas configuradas para cada estrategia,
- sus pesos y los valores normalizados para obtener un
- nivel y una puntuación de impacto.
-
  ---
*
*/

// ==============================
// Dependencias
// ==============================

const { STRATEGY_IMPACT_CONFIG } = require('./strategyImpactConfig');

const { normalizeMetric } = require('./metricNormalizers');

const { getImpactLevel } = require('./impactScale');

const { getMetricValue } = require('../strategyMetricSelectors');

// ==============================
// Cálculo ponderado
// ==============================

/**
 *
- Calcula el promedio ponderado del impacto de una estrategia.
-
- @param {Array} metricsConfig Configuración de métricas y pesos.
- @param {Object} analysis Resultado del análisis climático.
- @returns {{
- score: number,
- metricBreakdown: Array
- }}
 */
function calculateWeightedScore(metricsConfig, analysis) {
  let totalScore = 0;

  const metricBreakdown = metricsConfig.map(({ metric, weight }) => {
    const value = getMetricValue(metric, analysis);

    if (value == null || Number.isNaN(value)) {
      throw new Error(
        `No existe un valor válido para la métrica climática: ${metric}.`,
      );
    }

    const normalizedScore = normalizeMetric(metric, value);

    const weightedScore = Number((normalizedScore * (weight / 100)).toFixed(2));

    totalScore += weightedScore;

    return {
      metric,
      value,
      normalizedScore,
      weight,
      weightedScore,
    };
  });

  return {
    score: Number(totalScore.toFixed(2)),
    metricBreakdown,
  };
}

// ==============================
// Cálculo del impacto
// ==============================

/**
 *
- Calcula el impacto estimado de una estrategia bioclimática
- a partir del análisis climático.
-
- @param {string} strategyCode Código de la estrategia.
- @param {Object} analysis Resultado del análisis climático.
- @returns {Object} Resultado del impacto calculado.
 */
function calculateStrategyImpact(strategyCode, analysis) {
  const config = STRATEGY_IMPACT_CONFIG[strategyCode];

  if (!config) {
    throw new Error(
      `No existe una configuración de impacto para la estrategia: ${strategyCode}.`,
    );
  }

  const { score, metricBreakdown } = calculateWeightedScore(
    config.metrics,
    analysis,
  );

  return {
    ...getImpactLevel(score),
    metricBreakdown,
  };
}

// ==============================
// Exportaciones
// ==============================

module.exports = {
  calculateStrategyImpact,
};
