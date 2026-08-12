/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: statistics.js
 * --------------------------------------------------------------------
 * Calcula las estadísticas descriptivas de las variables climáticas
 * a partir de los datos horarios obtenidos desde Open-Meteo.
 *
 * Este módulo adapta la estructura de datos de Open-Meteo al modelo
 * interno utilizado por EcoBuildLab.
 *
 * No realiza clasificaciones climáticas ni genera estrategias
 * bioclimáticas.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const { HOURLY_VARIABLE_KEYS } = require('../../config/api');

const {
  calculateSum,
  calculateSummaryStatistics,
  round,
} = require('./mathUtilities');

// ==============================
// Funciones privadas
// ==============================

/**
 * Calcula las estadísticas descriptivas de una variable climática.
 *
 * Esta función es reutilizable para datos anuales, mensuales,
 * estacionales o cualquier otro período.
 *
 * @param {number[]} values
 * @returns {Object}
 */
function calculateVariableStatistics(values) {
  return calculateSummaryStatistics(values);
}

/**
 * Calcula las estadísticas de temperatura.
 *
 * @param {Object} hourly Datos horarios.
 * @returns {Object}
 */
function calculateTemperatureStatistics(hourly) {
  return {
    annual: calculateVariableStatistics(
      hourly[HOURLY_VARIABLE_KEYS.TEMPERATURE],
    ),
  };
}

/**
 * Calcula las estadísticas de humedad relativa.
 *
 * @param {Object} hourly Datos horarios.
 * @returns {Object}
 */
function calculateHumidityStatistics(hourly) {
  return {
    annual: calculateVariableStatistics(hourly[HOURLY_VARIABLE_KEYS.HUMIDITY]),
  };
}

/**
 * Calcula las estadísticas de precipitación.
 *
 * Incluye el total anual además de las estadísticas descriptivas.
 *
 * @param {Object} hourly Datos horarios.
 * @returns {Object}
 */
function calculatePrecipitationStatistics(hourly) {
  const values = hourly[HOURLY_VARIABLE_KEYS.PRECIPITATION];

  const { mean, median, maximum } = calculateVariableStatistics(values);

  return {
    annual: {
      total: round(calculateSum(values)),
      mean,
      median,
      maximum,
    },
  };
}

/**
 * Calcula las estadísticas de velocidad del viento.
 *
 * La dirección del viento se procesa posteriormente
 * mediante la rosa de los vientos.
 *
 * @param {Object} hourly Datos horarios.
 * @returns {Object}
 */
function calculateWindStatistics(hourly) {
  return {
    annual: {
      speed: calculateVariableStatistics(
        hourly[HOURLY_VARIABLE_KEYS.WIND_SPEED],
      ),
    },
  };
}

/**
 * Calcula las estadísticas de radiación solar.
 *
 * @param {Object} hourly Datos horarios.
 * @returns {Object}
 */
function calculateRadiationStatistics(hourly) {
  const values = hourly[HOURLY_VARIABLE_KEYS.RADIATION];

  const { mean, maximum } = calculateVariableStatistics(values);

  return {
    annual: {
      mean,
      maximum,
    },
  };
}

/**
 * Calcula las estadísticas de irradiación solar diaria.
 *
 * Open-Meteo proporciona shortwave_radiation_sum
 * en MJ/m² por día.
 *
 * El valor se convierte a kWh/m²·día.
 *
 * @param {Object} daily Datos diarios de Open-Meteo.
 * @returns {Object}
 */
function calculateSolarIrradiationStatistics(daily) {
  const values = daily.shortwave_radiation_sum
    .filter((value) => value !== null && value !== undefined)
    .map((value) => value / 3.6);

  const { mean, maximum } = calculateVariableStatistics(values);

  return {
    annual: {
      mean,
      maximum,
    },
  };
}

/**
 * Calcula las estadísticas de nubosidad.
 *
 * @param {Object} hourly Datos horarios.
 * @returns {Object}
 */
function calculateCloudCoverStatistics(hourly) {
  return {
    annual: calculateVariableStatistics(
      hourly[HOURLY_VARIABLE_KEYS.CLOUD_COVER],
    ),
  };
}

// ==============================
// Funciones públicas
// ==============================

/**
 * Calcula las estadísticas descriptivas de todas las
 * variables climáticas.
 *
 * @param {Object} hourly Datos horarios provenientes de Open-Meteo.
 * @returns {Object} Estadísticas climáticas.
 */
function calculateStatistics(hourly, daily) {
  return {
    temperature: calculateTemperatureStatistics(hourly),

    humidity: calculateHumidityStatistics(hourly),

    precipitation: calculatePrecipitationStatistics(hourly),

    wind: calculateWindStatistics(hourly),

    radiation: calculateRadiationStatistics(hourly),

    solarIrradiation: calculateSolarIrradiationStatistics(daily),

    cloudCover: calculateCloudCoverStatistics(hourly),
  };
}

// ==============================
// Exportaciones
// ==============================

module.exports = {
  calculateStatistics,
};
