/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: geocodingService.js
 * --------------------------------------------------------------------
 * Servicio encargado de consultar la API de geocodificación de
 * Open-Meteo.
 *
 * Permite buscar una ciudad y obtener la información geográfica
 * necesaria para realizar el análisis climático.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const { GEOCODING_API_URL } = require("../config/api");

// ==============================
// Constantes
// ==============================

const DEFAULT_RESULTS = 1;

const DEFAULT_LANGUAGE = "es";

const DEFAULT_FORMAT = "json";

// ==============================
// Funciones privadas
// ==============================

/**
 * Construye la URL de consulta para la API de geocodificación.
 *
 * @param {String} query Nombre de la ciudad.
 * @returns {String} URL completa de la solicitud.
 */
function buildSearchUrl(query) {
  const params = new URLSearchParams({
    name: query,
    count: DEFAULT_RESULTS,
    language: DEFAULT_LANGUAGE,
    format: DEFAULT_FORMAT,
  });

  return `${GEOCODING_API_URL}?${params.toString()}`;
}

/**
 * Consulta la API de geocodificación.
 *
 * @param {String} query Nombre de la ciudad.
 * @returns {Promise<Object>} Respuesta de la API.
 */
async function fetchLocation(query) {
  const response = await fetch(buildSearchUrl(query));

  if (!response.ok) {
    throw new Error("Error retrieving location data.");
  }

  return response.json();
}

/**
 * Normaliza la información de ubicación.
 *
 * @param {Object} result Resultado de Open-Meteo.
 * @returns {Object} Ubicación normalizada.
 */
function normalizeLocation(result) {
  return {
    city: result.name,

    region: result.admin1,

    country: result.country,

    latitude: result.latitude,

    longitude: result.longitude,

    elevation: result.elevation,

    timezone: result.timezone,
  };
}

/**
 * Busca una ciudad utilizando la API de Open-Meteo.
 *
 * @param {String} query Nombre de la ciudad.
 * @returns {Promise<Object>} Información normalizada.
 */
async function searchCity(query) {
  const data = await fetchLocation(query);

  if (!data.results || data.results.length === 0) {
    throw new Error("City not found.");
  }

  return normalizeLocation(data.results[0]);
}

// ==============================
// Funciones públicas
// ==============================

/**
 * Obtiene la ubicación geográfica para generar un análisis climático.
 *
 * @param {Object} data Información suministrada por el usuario.
 * @param {String} data.city Nombre de la ciudad.
 * @param {String} [data.country] País (opcional).
 * @returns {Promise<Object>} Ubicación normalizada.
 */
async function getLocation(data) {
  const query = [data.city, data.country].filter(Boolean).join(", ");

  return searchCity(query);
}

// ==============================
// Exportaciones
// ==============================

module.exports = {
  searchCity,
  getLocation,
};
