/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: monthly.js
 * --------------------------------------------------------------------
 * Genera estadísticas climáticas mensuales a partir de datos horarios.
 *
 * Este módulo organiza los datos climáticos por mes y calcula un
 * resumen estadístico para cada variable utilizando las utilidades
 * matemáticas y temporales del sistema.
 *
 * El resultado constituye la base para análisis climáticos,
 * visualizaciones y generación de estrategias bioclimáticas.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const { HOURLY_VARIABLE_KEYS } = require("../../config/api");

const { calculateSummaryStatistics, calculateSum } = require("./mathUtilities");

const { groupValuesByMonth } = require("./timeUtilities");

// ==============================
// Funciones privadas
// ==============================

/**
 * Calcula estadísticas para una colección de valores
 * previamente agrupados por mes.
 *
 * @param {number[][]} monthlyValues Valores agrupados por mes.
 * @returns {Object[]} Estadísticas mensuales.
 */
function calculateMonthlyVariableStatistics(monthlyValues) {
  return monthlyValues.map((values) => calculateSummaryStatistics(values));
}

/**
 * Calcula estadísticas mensuales de precipitación.
 *
 * Además de las estadísticas generales, incorpora la
 * precipitación total mensual.
 *
 * @param {number[][]} monthlyValues Valores agrupados por mes.
 * @returns {Object[]} Estadísticas mensuales.
 */
function calculateMonthlyPrecipitation(monthlyValues) {
  const monthlyStatistics = calculateMonthlyVariableStatistics(monthlyValues);

  return monthlyStatistics.map((statistics, month) => ({
    total: calculateSum(monthlyValues[month]),

    mean: statistics.mean,

    median: statistics.median,

    maximum: statistics.maximum,
  }));
}

/**
 * Calcula estadísticas mensuales de radiación solar.
 *
 * Conserva únicamente los indicadores de interés para
 * el análisis bioclimático.
 *
 * @param {number[][]} monthlyValues Valores agrupados por mes.
 * @returns {Object[]} Estadísticas mensuales.
 */
function calculateMonthlyRadiation(monthlyValues) {
  return calculateMonthlyVariableStatistics(monthlyValues).map(
    (statistics) => ({
      mean: statistics.mean,

      maximum: statistics.maximum,
    }),
  );
}

// ==============================
// Funciones públicas
// ==============================

/**
 * Calcula el análisis climático mensual.
 *
 * @param {Object} hourly Datos horarios de Open-Meteo.
 * @returns {Object[]} Resumen climático mensual.
 */
function calculateMonthlyAnalysis(hourly) {
  const time = hourly.time;

  const monthlyTemperature = groupValuesByMonth(
    time,
    hourly[HOURLY_VARIABLE_KEYS.TEMPERATURE],
  );

  const monthlyHumidity = groupValuesByMonth(
    time,
    hourly[HOURLY_VARIABLE_KEYS.HUMIDITY],
  );

  const monthlyPrecipitation = groupValuesByMonth(
    time,
    hourly[HOURLY_VARIABLE_KEYS.PRECIPITATION],
  );

  const monthlyWindSpeed = groupValuesByMonth(
    time,
    hourly[HOURLY_VARIABLE_KEYS.WIND_SPEED],
  );

  const monthlyRadiation = groupValuesByMonth(
    time,
    hourly[HOURLY_VARIABLE_KEYS.RADIATION],
  );

  const monthlyCloudCover = groupValuesByMonth(
    time,
    hourly[HOURLY_VARIABLE_KEYS.CLOUD_COVER],
  );

  const temperature = calculateMonthlyVariableStatistics(monthlyTemperature);

  const humidity = calculateMonthlyVariableStatistics(monthlyHumidity);

  const precipitation = calculateMonthlyPrecipitation(monthlyPrecipitation);

  const windSpeed = calculateMonthlyVariableStatistics(monthlyWindSpeed);

  const radiation = calculateMonthlyRadiation(monthlyRadiation);

  const cloudCover = calculateMonthlyVariableStatistics(monthlyCloudCover);

  return Array.from({ length: 12 }, (_, month) => ({
    month: month + 1,

    temperature: temperature[month],

    humidity: humidity[month],

    precipitation: precipitation[month],

    wind: {
      speed: windSpeed[month],
    },

    radiation: radiation[month],

    cloudCover: cloudCover[month],
  }));
}

// ==============================
// Exportaciones
// ==============================

module.exports = {
  calculateMonthlyAnalysis,
};
