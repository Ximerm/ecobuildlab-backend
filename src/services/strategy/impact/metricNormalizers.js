/**
 *
  ---
- EcoBuildLab
- Archivo: metricNormalizers.js
-
  ---
- Funciones encargadas de normalizar las métricas climáticas
- utilizadas para calcular el impacto de las estrategias.
-
- La normalización transforma los valores climáticos en una
- puntuación basada en los puntos de referencia definidos
- para cada métrica.
-
  ---
*
*/

// ==============================
// Dependencias
// ==============================

const { METRIC_SCALES } = require('./metricScales');

// ==============================
// Interpolación de segmentos
// ==============================

/**
 *
- Calcula la puntuación interpolada entre dos puntos
- de referencia.
-
- @param {Object} start Punto inicial.
- @param {Object} end Punto final.
- @param {number} value Valor de la métrica.
- @returns {number} Puntuación interpolada.
 */
function interpolateSegment(start, end, value) {
  const valueRange = end.value - start.value;
  const valueOffset = value - start.value;

  const percentage = valueOffset / valueRange;

  const scoreRange = end.score - start.score;

  return Math.round(start.score + scoreRange * percentage);
}

// ==============================
// Interpolación
// ==============================

/**
 *
- Interpola un valor dentro de los puntos de referencia
- definidos para una métrica.
-
- Los valores inferiores al primer punto reciben la
- puntuación mínima y los valores superiores al último
- punto reciben la puntuación máxima.
-
- @param {Array} referencePoints Puntos de referencia.
- @param {number} value Valor de la métrica.
- @returns {number} Puntuación interpolada.
 */
function interpolate(referencePoints, value) {
  const firstPoint = referencePoints[0];
  const lastPoint = referencePoints[referencePoints.length - 1];

  // Limita al valor mínimo.
  if (value <= firstPoint.value) {
    return firstPoint.score;
  }

  // Limita al valor máximo.
  if (value >= lastPoint.value) {
    return lastPoint.score;
  }

  // Busca el intervalo correspondiente.
  for (let index = 1; index < referencePoints.length; index += 1) {
    const start = referencePoints[index - 1];
    const end = referencePoints[index];

    if (value >= start.value && value <= end.value) {
      return interpolateSegment(start, end, value);
    }
  }

  return lastPoint.score;
}

// ==============================
// Normalización de métricas
// ==============================

/**
 *
- Obtiene la puntuación normalizada correspondiente
- a una métrica climática.
-
- @param {string} metric Código de la métrica climática.
- @param {number} value Valor de la métrica.
- @returns {number} Puntuación normalizada.
 */
function normalizeMetric(metric, value) {
  const metricScale = METRIC_SCALES[metric];

  if (!metricScale) {
    throw new Error(
      `No existe una escala de normalización para la métrica climática: ${metric}.`,
    );
  }

  return interpolate(metricScale.referencePoints, value);
}

// ==============================
// Exportaciones
// ==============================

module.exports = {
  normalizeMetric,
};
