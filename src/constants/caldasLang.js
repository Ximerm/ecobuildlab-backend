/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: caldasLang.js
 * --------------------------------------------------------------------
 * Define las constantes utilizadas por la clasificación climática
 * de Caldas-Lang.
 *
 * Este archivo contiene únicamente datos de referencia.
 * No implementa lógica de clasificación.
 * --------------------------------------------------------------------
 */

// ==============================
// Constantes
// ==============================

const MIN_TEMPERATURE = 0;
const MAX_TEMPERATURE = Infinity;

const MIN_LANG_INDEX = 0;
const MAX_LANG_INDEX = Infinity;

// ==============================
// Zonas térmicas
// ==============================

const THERMAL_ZONES = [
  {
    code: "WARM",
    name: "Cálido",
    min: 24,
    max: MAX_TEMPERATURE,
  },
  {
    code: "TEMPERATE",
    name: "Templado",
    min: 17,
    max: 24,
  },
  {
    code: "COLD",
    name: "Frío",
    min: 12,
    max: 17,
  },
  {
    code: "PARAMO",
    name: "Páramo",
    min: MIN_TEMPERATURE,
    max: 12,
  },
];

// ==============================
// Zonas de humedad (Índice de Lang)
// ==============================

const MOISTURE_ZONES = [
  {
    code: "ARID",
    name: "Árido",
    min: MIN_LANG_INDEX,
    max: 20,
  },
  {
    code: "SEMI_ARID",
    name: "Semiárido",
    min: 20,
    max: 40,
  },
  {
    code: "SEMI_HUMID",
    name: "Semihúmedo",
    min: 40,
    max: 60,
  },
  {
    code: "HUMID",
    name: "Húmedo",
    min: 60,
    max: 100,
  },
  {
    code: "VERY_HUMID",
    name: "Muy húmedo",
    min: 100,
    max: 160,
  },
  {
    code: "SUPER_HUMID",
    name: "Superhúmedo",
    min: 160,
    max: MAX_LANG_INDEX,
  },
];

// ==============================
// Exportaciones
// ==============================

module.exports = {
  THERMAL_ZONES,
  MOISTURE_ZONES,
};
