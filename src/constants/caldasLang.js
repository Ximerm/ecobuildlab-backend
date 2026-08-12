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
// Límites generales
// ==============================

const MIN_TEMPERATURE = 0;
const MAX_TEMPERATURE = Infinity;

const MIN_LANG_INDEX = 0;
const MAX_LANG_INDEX = Infinity;

// ==============================
// Códigos de zonas térmicas
// ==============================

const THERMAL_ZONE_CODES = Object.freeze({
  WARM: 'WARM',
  TEMPERATE: 'TEMPERATE',
  COLD: 'COLD',
  PARAMO: 'PARAMO',
});

// ==============================
// Códigos de zonas de humedad
// ==============================

const MOISTURE_ZONE_CODES = Object.freeze({
  ARID: 'ARID',
  SEMI_ARID: 'SEMI_ARID',
  SEMI_HUMID: 'SEMI_HUMID',
  HUMID: 'HUMID',
  VERY_HUMID: 'VERY_HUMID',
  SUPER_HUMID: 'SUPER_HUMID',
});

// ==============================
// Zonas térmicas
// ==============================

const THERMAL_ZONES = Object.freeze([
  {
    code: THERMAL_ZONE_CODES.WARM,
    name: 'Cálido',
    min: 24,
    max: MAX_TEMPERATURE,
  },
  {
    code: THERMAL_ZONE_CODES.TEMPERATE,
    name: 'Templado',
    min: 17,
    max: 24,
  },
  {
    code: THERMAL_ZONE_CODES.COLD,
    name: 'Frío',
    min: 12,
    max: 17,
  },
  {
    code: THERMAL_ZONE_CODES.PARAMO,
    name: 'Páramo',
    min: MIN_TEMPERATURE,
    max: 12,
  },
]);

// ==============================
// Zonas de humedad
// Índice de Lang
// ==============================

const MOISTURE_ZONES = Object.freeze([
  {
    code: MOISTURE_ZONE_CODES.ARID,
    name: 'Árido',
    min: MIN_LANG_INDEX,
    max: 20,
  },
  {
    code: MOISTURE_ZONE_CODES.SEMI_ARID,
    name: 'Semiárido',
    min: 20,
    max: 40,
  },
  {
    code: MOISTURE_ZONE_CODES.SEMI_HUMID,
    name: 'Semihúmedo',
    min: 40,
    max: 60,
  },
  {
    code: MOISTURE_ZONE_CODES.HUMID,
    name: 'Húmedo',
    min: 60,
    max: 100,
  },
  {
    code: MOISTURE_ZONE_CODES.VERY_HUMID,
    name: 'Muy húmedo',
    min: 100,
    max: 160,
  },
  {
    code: MOISTURE_ZONE_CODES.SUPER_HUMID,
    name: 'Superhúmedo',
    min: 160,
    max: MAX_LANG_INDEX,
  },
]);

// ==============================
// Exportaciones
// ==============================

module.exports = {
  THERMAL_ZONE_CODES,
  MOISTURE_ZONE_CODES,
  THERMAL_ZONES,
  MOISTURE_ZONES,
};
