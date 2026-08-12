/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: caldasLang.js
 * --------------------------------------------------------------------
 * Implementa la clasificación climática de Caldas-Lang.
 *
 * Este módulo calcula el índice de Lang y determina la zona térmica
 * y la zona de humedad a partir de las estadísticas climáticas.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const { THERMAL_ZONES, MOISTURE_ZONES } = require('../../constants/caldasLang');

// ==============================
// Funciones privadas
// ==============================

/**
 * Busca la zona térmica correspondiente.
 *
 * @param {number} temperature Temperatura media anual.
 * @returns {Object|null} Zona térmica encontrada.
 */
function findThermalZone(temperature) {
  return (
    THERMAL_ZONES.find(
      ({ min, max }) => temperature >= min && temperature < max,
    ) || null
  );
}

/**
 * Busca la zona de humedad correspondiente.
 *
 * @param {number} langIndex Índice de Lang.
 * @returns {Object|null} Zona de humedad encontrada.
 */
function findMoistureZone(langIndex) {
  return (
    MOISTURE_ZONES.find(
      ({ min, max }) => langIndex >= min && langIndex < max,
    ) || null
  );
}

/**
 * Construye una zona simplificada.
 *
 * @param {Object|null} zone Zona encontrada.
 * @returns {Object|null}
 */
function buildZone(zone) {
  if (!zone) {
    return null;
  }

  return {
    code: zone.code,
    name: zone.name,
  };
}

/**
 * Construye el clima resultante.
 *
 * @param {Object|null} thermalZone
 * @param {Object|null} moistureZone
 * @returns {Object|null}
 */
function buildClimate(thermalZone, moistureZone) {
  if (!thermalZone || !moistureZone) {
    return null;
  }

  return {
    code: `${thermalZone.code}_${moistureZone.code}`,
    name: `${thermalZone.name} ${moistureZone.name.toLowerCase()}`,
  };
}

// ==============================
// Funciones públicas
// ==============================

/**
 * Calcula el índice de Lang.
 *
 * Lang = Precipitación anual / Temperatura media anual
 *
 * @param {number} temperature Temperatura media anual (°C).
 * @param {number} precipitation Precipitación anual (mm).
 * @returns {number} Índice de Lang.
 */
function calculateLangIndex(temperature, precipitation) {
  if (temperature <= 0) {
    return 0;
  }

  return precipitation / temperature;
}

/**
 * Clasifica el clima utilizando el método de Caldas-Lang.
 *
 * @param {Object} statistics Estadísticas climáticas.
 * @returns {Object} Clasificación climática.
 */
function classifyClimate(statistics) {
  const temperature = statistics.temperature.annual.mean;

  const precipitation = statistics.precipitation.annual.total;

  const langIndex = calculateLangIndex(temperature, precipitation);

  const thermalZone = findThermalZone(temperature);

  const moistureZone = findMoistureZone(langIndex);

  return {
    langIndex,

    thermalZone: buildZone(thermalZone),

    moistureZone: buildZone(moistureZone),

    climate: buildClimate(thermalZone, moistureZone),
  };
}

// ==============================
// Exportaciones
// ==============================

module.exports = {
  calculateLangIndex,
  classifyClimate,
};
