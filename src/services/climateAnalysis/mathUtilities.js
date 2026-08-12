/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: mathUtilities.js
 * --------------------------------------------------------------------
 * Funciones matemáticas reutilizables para el procesamiento climático.
 *
 * Este módulo contiene operaciones genéricas que pueden ser utilizadas
 * por cualquier servicio del proyecto (estadísticas, análisis mensual,
 * generación del TMY, perfiles bioclimáticos, etc.).
 *
 * Ninguna función conoce conceptos climáticos; únicamente realiza
 * operaciones matemáticas sobre arreglos de valores numéricos.
 * --------------------------------------------------------------------
 */

// ==============================
// Funciones públicas
// ==============================

/**
 * Elimina valores inválidos del arreglo.
 *
 * Open-Meteo puede devolver valores nulos en algunas variables.
 * Esta función evita que dichos valores afecten los cálculos.
 *
 * @param {number[]} values Arreglo de valores numéricos.
 * @returns {number[]} Arreglo únicamente con valores válidos.
 */
function removeInvalidValues(values) {
  return values.filter(
    (value) => value !== null && value !== undefined && !Number.isNaN(value),
  );
}

/**
 * Calcula la suma de todos los valores válidos.
 *
 * @param {number[]} values
 * @returns {number}
 */
function calculateSum(values) {
  const validValues = removeInvalidValues(values);

  return validValues.reduce((sum, value) => sum + value, 0);
}

/**
 * Calcula el promedio aritmético.
 *
 * Si el arreglo está vacío devuelve null.
 *
 * @param {number[]} values
 * @returns {number|null}
 */
function calculateMean(values) {
  const validValues = removeInvalidValues(values);

  if (validValues.length === 0) {
    return null;
  }

  return calculateSum(validValues) / validValues.length;
}

/**
 * Obtiene el valor mínimo.
 *
 * @param {number[]} values
 * @returns {number|null}
 */
function calculateMinimum(values) {
  const validValues = removeInvalidValues(values);

  if (validValues.length === 0) {
    return null;
  }

  return Math.min(...validValues);
}

/**
 * Obtiene el valor máximo.
 *
 * @param {number[]} values
 * @returns {number|null}
 */
function calculateMaximum(values) {
  const validValues = removeInvalidValues(values);

  if (validValues.length === 0) {
    return null;
  }

  return Math.max(...validValues);
}

/**
 * Calcula la mediana de un conjunto de datos.
 *
 * La mediana es menos sensible a valores extremos que el promedio
 * y puede ser útil en futuros análisis climáticos o en la
 * generación del Año Meteorológico Típico (TMY).
 *
 * @param {number[]} values
 * @returns {number|null}
 */
function calculateMedian(values) {
  const validValues = removeInvalidValues(values).sort((a, b) => a - b);

  if (validValues.length === 0) {
    return null;
  }

  const middle = Math.floor(validValues.length / 2);

  if (validValues.length % 2 === 0) {
    return (validValues[middle - 1] + validValues[middle]) / 2;
  }

  return validValues[middle];
}

/**
 * Calcula el porcentaje que representa un valor respecto a un total.
 *
 * Devuelve null cuando el total es cero o no es válido.
 *
 * @param {number} value
 * @param {number} total
 * @returns {number|null}
 */
function calculatePercentage(value, total) {
  if (
    total === null
    || total === undefined
    || Number.isNaN(total)
    || total === 0
  ) {
    return null;
  }

  return (value / total) * 100;
}

/**
 * Calcula la amplitud de un conjunto de datos.
 *
 * La amplitud corresponde a la diferencia entre el valor
 * máximo y el valor mínimo.
 *
 * @param {number[]} values
 * @returns {number|null}
 */
function calculateRange(values) {
  const minimum = calculateMinimum(values);
  const maximum = calculateMaximum(values);

  if (minimum === null || maximum === null) {
    return null;
  }

  return maximum - minimum;
}

/**
 * Redondea un número al número de decimales indicado.
 *
 * Se utiliza para mantener un formato consistente en todas
 * las estadísticas climáticas.
 *
 * @param {number} value Valor a redondear.
 * @param {number} decimals Número de decimales.
 * @returns {number|null}
 */
function round(value, decimals = 1) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return null;
  }

  return Number(value.toFixed(decimals));
}

/**
 * Calcula un resumen estadístico básico de un conjunto de datos.
 *
 * Devuelve las estadísticas descriptivas más utilizadas para
 * el análisis climático.
 *
 * @param {number[]} values
 * @returns {Object}
 */
function calculateSummaryStatistics(values) {
  const mean = calculateMean(values);
  const median = calculateMedian(values);
  const minimum = calculateMinimum(values);
  const maximum = calculateMaximum(values);
  const range = calculateRange(values);

  return {
    mean: round(mean),
    median: round(median),
    minimum: round(minimum),
    maximum: round(maximum),
    range: round(range),
  };
}

// ==============================
// Exportaciones
// ==============================

module.exports = {
  removeInvalidValues,
  calculateSum,
  calculateMean,
  calculateMinimum,
  calculateMaximum,
  calculateMedian,
  calculatePercentage,
  calculateRange,
  round,
  calculateSummaryStatistics,
};
