/**
 *
  ---
- EcoBuildLab
- Archivo: strategyGenerator.js
-
  ---
- Generador de estrategias bioclimáticas.
-
- Construye las estrategias aplicables a partir del análisis climático,
- evaluando las condiciones de cada recomendación y ordenándolas
- según su impacto y prioridad.
-
  ---
*
*/

// ==============================
// Dependencias
// ==============================

const { strategyCatalog } = require('./strategyCatalog');

const { strategyRecommendations } = require('./strategyRecommendations');

const { strategyMetricSelectors } = require('./strategyMetricSelectors');

const { calculateStrategyImpact } = require('./impact/strategyImpact');

const { RECOMMENDATION_PRIORITY } = require('./strategyConstants');

// ==============================
// Prioridad de recomendaciones
// ==============================

/**
 *
- Define el orden de las prioridades.
-
- Esto desacopla el orden lógico de los valores
- definidos en RECOMMENDATION_PRIORITY.
 */
const PRIORITY_ORDER = Object.freeze({
  [RECOMMENDATION_PRIORITY.HIGH]: 0,
  [RECOMMENDATION_PRIORITY.MEDIUM]: 1,
  [RECOMMENDATION_PRIORITY.LOW]: 2,
});

// ==============================
// Comparación de métricas
// ==============================

/**
 *
- Compara una métrica climática con los límites
- establecidos por la recomendación.
-
- Soporta:
-
- { min }
-
- { max }
-
- { min, max }
-
- @param {Number} value Valor de la métrica.
- @param {Object} limits Límites establecidos.
- @returns {Boolean} Indica si el valor cumple los límites.
 */
function compareMetric(value, limits) {
  if (value == null) {
    return false;
  }

  const { min, max } = limits;

  if (min !== undefined && value < min) {
    return false;
  }

  if (max !== undefined && value > max) {
    return false;
  }

  return true;
}

// ==============================
// Zona térmica
// ==============================

/**
 *
- Verifica si la zona térmica del análisis
- coincide con las requeridas por la recomendación.
-
- @param {Array} thermalZones Zonas térmicas requeridas.
- @param {Object} analysis Resultado del análisis climático.
- @returns {Boolean} Indica si coincide la zona térmica.
 */
function matchesThermalZone(thermalZones, analysis) {
  if (!thermalZones?.length) {
    return true;
  }

  return thermalZones.includes(analysis.classification.thermalZone.code);
}

// ==============================
// Zona de humedad
// ==============================

/**
 *
- Verifica si la zona de humedad del análisis
- coincide con las requeridas por la recomendación.
-
- @param {Array} moistureZones Zonas de humedad requeridas.
- @param {Object} analysis Resultado del análisis climático.
- @returns {Boolean} Indica si coincide la zona de humedad.
 */
function matchesMoistureZone(moistureZones, analysis) {
  if (!moistureZones?.length) {
    return true;
  }

  return moistureZones.includes(analysis.classification.moistureZone.code);
}

// ==============================
// Métricas climáticas
// ==============================

/**
 *
- Evalúa todas las métricas climáticas definidas
- para una recomendación.
-
- Todas las métricas deben cumplirse para que
- la recomendación sea considerada aplicable.
-
- @param {Object} metrics Métricas y límites definidos.
- @param {Object} analysis Resultado del análisis climático.
- @returns {Boolean} Indica si se cumplen las métricas.
 */
function matchesMetrics(metrics, analysis) {
  if (!metrics) {
    return true;
  }

  return Object.entries(metrics).every(([metric, limits]) => {
    const selector = strategyMetricSelectors[metric];

    // La métrica no está registrada en los selectores.
    if (!selector) {
      return false;
    }

    const value = selector(analysis);

    return compareMetric(value, limits);
  });
}

// ==============================
// Evaluación de condiciones
// ==============================

/**
 *
- Verifica si una recomendación cumple todas
- las condiciones necesarias.
-
- @param {Object} analysis Resultado del análisis climático.
- @param {Object} conditions Condiciones de la recomendación.
- @returns {Boolean} Indica si se cumplen las condiciones.
 */
function matchesConditions(analysis, conditions = {}) {
  return (
    matchesThermalZone(conditions.thermalZones, analysis)
    && matchesMoistureZone(conditions.moistureZones, analysis)
    && matchesMetrics(conditions.metrics, analysis)
  );
}

// ==============================
// Orden de recomendaciones
// ==============================

/**
 *
- Ordena las recomendaciones según su prioridad.
-
- El orden se define mediante PRIORITY_ORDER para evitar
- depender de los valores numéricos de las constantes.
-
- @param {Object} recommendationA Primera recomendación.
- @param {Object} recommendationB Segunda recomendación.
- @returns {Number} Diferencia de prioridad.
 */
function comparePriority(recommendationA, recommendationB) {
  return (
    PRIORITY_ORDER[recommendationA.priority]
    - PRIORITY_ORDER[recommendationB.priority]
  );
}

// ==============================
// Recomendaciones aplicables
// ==============================

/**
 *
- Obtiene las recomendaciones aplicables para una estrategia
- y las ordena según su prioridad.
-
- @param {String} strategyCode Código de la estrategia.
- @param {Object} analysis Resultado del análisis climático.
- @returns {Array} Recomendaciones aplicables.
 */
function getApplicableRecommendations(strategyCode, analysis) {
  const recommendations = strategyRecommendations[strategyCode] ?? [];

  return recommendations
    .filter((recommendation) => matchesConditions(analysis, recommendation.conditions))
    .sort(comparePriority);
}

// ==============================
// Construcción de estrategias
// ==============================

/**
 *
- Construye una estrategia incorporando únicamente
- las recomendaciones que cumplen las condiciones climáticas.
-
- @param {Object} strategy Estrategia del catálogo.
- @param {Object} analysis Resultado del análisis climático.
- @returns {Object} Estrategia con recomendaciones e impacto.
 */
function buildStrategy(strategy, analysis) {
  const recommendations = getApplicableRecommendations(strategy.code, analysis);

  const impact = calculateStrategyImpact(strategy.code, analysis);

  return {
    ...strategy,
    impact,
    recommendations,
    hasRecommendations: recommendations.length > 0,
  };
}

// ==============================
// Orden de estrategias
// ==============================

/**
 *
- Ordena las estrategias según su impacto estimado.
-
- Las estrategias con mayor impacto aparecen primero.
-
- @param {Object} strategyA Primera estrategia.
- @param {Object} strategyB Segunda estrategia.
- @returns {Number} Diferencia de impacto.
 */
function compareImpact(strategyA, strategyB) {
  return strategyB.impact.score - strategyA.impact.score;
}

// ==============================
// Generador de estrategias
// ==============================

/**
 *
- Genera todas las estrategias bioclimáticas aplicables
- para un análisis climático.
-
- Las estrategias se construyen a partir del catálogo,
- incorporando sus recomendaciones e impacto estimado.
-
- @param {Object} analysis Resultado del análisis climático.
- @returns {Array} Estrategias con sus recomendaciones e impacto.
 */
function generateStrategies(analysis) {
  return strategyCatalog
    .map((strategy) => buildStrategy(strategy, analysis))
    .sort(compareImpact);
}

// ==============================
// Exportaciones
// ==============================

module.exports = {
  generateStrategies,
};
