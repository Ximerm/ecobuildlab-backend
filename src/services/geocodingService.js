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
    count: 1,
    language: "es",
    format: "json",
  });

  return `${GEOCODING_API_URL}?${params.toString()}`;
}

// ==============================
// Funciones públicas
// ==============================

/**
 * Busca una ciudad utilizando la API de Open-Meteo.
 *
 * @param {String} query Nombre de la ciudad.
 * @returns {Promise<Object>} Información normalizada de la ubicación.
 */
async function searchCity(query) {
  const response = await fetch(buildSearchUrl(query));

  if (!response.ok) {
    throw new Error("Error retrieving location data.");
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("City not found.");
  }

  const result = data.results[0];

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

// ==============================
// Exportaciones
// ==============================

module.exports = {
  searchCity,
};
