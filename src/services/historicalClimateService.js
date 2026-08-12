/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: historicalClimateService.js
 * --------------------------------------------------------------------
 * Servicio encargado de obtener información climática histórica
 * desde la API Archive de Open-Meteo.
 *
 * Este módulo descarga los registros horarios correspondientes al
 * período solicitado y devuelve la información sin procesar para
 * su posterior análisis.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const {
  ARCHIVE_API_URL,
  HOURLY_VARIABLES,
  HISTORICAL_PERIOD_YEARS,
} = require('../config/api');

// ==============================
// Funciones privadas
// ==============================

/**
 * Calcula el período histórico que será consultado.
 *
 * @param {Number} years Número de años históricos.
 * @returns {Object} Fechas de inicio y fin.
 */
function getPeriod(years) {
  const currentYear = new Date().getFullYear();

  // Se utiliza el último año completo disponible.
  const endYear = currentYear - 1;
  const startYear = endYear - years + 1;

  return {
    startDate: `${startYear}-01-01`,
    endDate: `${endYear}-12-31`,
  };
}

/**
 * Construye la URL para consultar la API Archive.
 *
 * @param {Object} location Ubicación geográfica.
 * @param {Object} period Período de consulta.
 * @returns {String} URL de la solicitud.
 */
function buildArchiveUrl(location, period) {
  const params = new URLSearchParams({
    latitude: location.latitude,
    longitude: location.longitude,
    start_date: period.startDate,
    end_date: period.endDate,
    hourly: HOURLY_VARIABLES.join(','),
    timezone: location.timezone,
  });

  return `${ARCHIVE_API_URL}?${params.toString()}`;
}

/**
 * Descarga la información histórica desde la API Archive.
 *
 * @param {String} url URL de consulta.
 * @returns {Promise<Object>} Datos históricos.
 */
async function fetchArchiveData(url) {
  const response = await fetch(url);

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.reason || 'Error retrieving historical climate data.',
    );
  }

  return response.json();
}

// ==============================
// Funciones públicas
// ==============================

/**
 * Obtiene la información climática histórica de una ubicación.
 *
 * @param {Object} location Ubicación geográfica.
 * @param {Object} [options={}] Opciones de consulta.
 * @param {Number} [options.years] Número de años históricos.
 * @returns {Promise<Object>} Información climática histórica.
 */
async function getHistoricalClimate(location, options = {}) {
  const years = options.years ?? HISTORICAL_PERIOD_YEARS;

  const period = getPeriod(years);

  const url = buildArchiveUrl(location, period);

  const data = await fetchArchiveData(url);

  return {
    location,

    period,

    metadata: {
      latitude: data.latitude,
      longitude: data.longitude,
      elevation: data.elevation,
      timezone: data.timezone,
    },

    // Registros horarios sin procesar.
    // Serán utilizados posteriormente por climateAnalysisService.
    hourly: data.hourly,
  };
}

// ==============================
// Exportaciones
// ==============================

module.exports = {
  getHistoricalClimate,
};
