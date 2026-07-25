/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: api.js
 * --------------------------------------------------------------------
 * Configuración centralizada de las APIs y parámetros utilizados
 * por EcoBuildLab para obtener información climática desde Open-Meteo.
 *
 * Centralizar esta información facilita el mantenimiento del proyecto.
 * Si en el futuro cambia una URL, se agrega una nueva API o se requieren
 * nuevas variables climáticas, únicamente será necesario modificar
 * este archivo.
 * --------------------------------------------------------------------
 */

// ==============================
// URLs de las APIs
// ==============================

/**
 * API de geocodificación.
 *
 * Permite obtener la ubicación geográfica de una ciudad,
 * incluyendo coordenadas, elevación, país y zona horaria.
 */
const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";

/**
 * API de datos climáticos históricos.
 *
 * Proporciona información meteorológica horaria para un
 * período determinado.
 */
const ARCHIVE_API_URL = "https://archive-api.open-meteo.com/v1/archive";

// ==============================
// Variables climáticas
// ==============================

/**
 * Variables horarias solicitadas a la API.
 *
 * Estas variables constituyen la base para generar:
 * - Estadísticas climáticas.
 * - Resúmenes mensuales.
 * - Perfiles bioclimáticos.
 * - Estrategias pasivas.
 * - Año Meteorológico Típico (TMY).
 *
 * En futuras versiones podrán agregarse otras variables
 * (radiación directa, radiación difusa, presión, etc.)
 * sin modificar los servicios que consumen esta configuración.
 */
const HOURLY_VARIABLES = [
  "temperature_2m",
  "relative_humidity_2m",
  "precipitation",
  "wind_speed_10m",
  "wind_direction_10m",
  "shortwave_radiation",
  "cloud_cover",
];

/**
 * Alias utilizados internamente para acceder a las
 * variables climáticas devueltas por Open-Meteo.
 *
 * Este objeto evita repetir los nombres originales de la API
 * en los distintos servicios de EcoBuildLab.
 */

const HOURLY_VARIABLE_KEYS = {
  TEMPERATURE: "temperature_2m",
  HUMIDITY: "relative_humidity_2m",
  PRECIPITATION: "precipitation",
  WIND_SPEED: "wind_speed_10m",
  WIND_DIRECTION: "wind_direction_10m",
  RADIATION: "shortwave_radiation",
  CLOUD_COVER: "cloud_cover",
};

// ==============================
// Configuración del proyecto
// ==============================

/**
 * Número de años de información histórica utilizados
 * para el análisis climático.
 *
 * Este valor puede modificarse durante el desarrollo
 * para reducir el tiempo de descarga de datos.
 *
 * Producción:
 * 30 años
 *
 * Desarrollo:
 * 1 año
 */

const HISTORICAL_PERIOD_YEARS = 1;

// ==============================
// Exportaciones
// ==============================

module.exports = {
  HISTORICAL_PERIOD_YEARS,

  GEOCODING_API_URL,
  ARCHIVE_API_URL,

  HOURLY_VARIABLES,
  HOURLY_VARIABLE_KEYS,
};
