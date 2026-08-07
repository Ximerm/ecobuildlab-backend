/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: windRose.js
 * --------------------------------------------------------------------
 * Configuración utilizada para el análisis de la rosa de vientos.
 *
 * Define los parámetros empleados para clasificar la dirección
 * del viento.
 * --------------------------------------------------------------------
 */

// ==============================
// Configuración
// ==============================

/**
 * Velocidad mínima (m/s) para considerar condiciones de calma.
 */
const CALM_THRESHOLD = 0.5;

/**
 * Ángulo (°) cubierto por cada sector direccional.
 */
const SECTOR_ANGLE = 22.5;

/**
 * Direcciones de la rosa de los vientos.
 *
 * El orden define la posición angular comenzando desde el Norte
 * y avanzando en sentido horario.
 */
const DIRECTIONS = [
  {
    code: "N",
    name: "Norte",
  },
  {
    code: "NNE",
    name: "Nor-noreste",
  },
  {
    code: "NE",
    name: "Noreste",
  },
  {
    code: "ENE",
    name: "Este-noreste",
  },
  {
    code: "E",
    name: "Este",
  },
  {
    code: "ESE",
    name: "Este-sureste",
  },
  {
    code: "SE",
    name: "Sureste",
  },
  {
    code: "SSE",
    name: "Sur-sureste",
  },
  {
    code: "S",
    name: "Sur",
  },
  {
    code: "SSW",
    name: "Sur-suroeste",
  },
  {
    code: "SW",
    name: "Suroeste",
  },
  {
    code: "WSW",
    name: "Oeste-suroeste",
  },
  {
    code: "W",
    name: "Oeste",
  },
  {
    code: "WNW",
    name: "Oeste-noroeste",
  },
  {
    code: "NW",
    name: "Noroeste",
  },
  {
    code: "NNW",
    name: "Nor-noroeste",
  },
];

// ==============================
// Exportaciones
// ==============================

module.exports = {
  CALM_THRESHOLD,
  SECTOR_ANGLE,
  DIRECTIONS,
};
