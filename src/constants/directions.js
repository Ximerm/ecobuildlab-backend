/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: directions.js
 * --------------------------------------------------------------------
 * Catálogo de direcciones utilizadas por la rosa de vientos.
 *
 * Este archivo centraliza los códigos y nombres de las direcciones
 * cardinales e intercardinales empleadas por el sistema.
 * --------------------------------------------------------------------
 */

// ==============================
// Constantes
// ==============================

const DIRECTIONS = [
  {
    code: 'N',
    name: 'North',
  },
  {
    code: 'NNE',
    name: 'North-Northeast',
  },
  {
    code: 'NE',
    name: 'Northeast',
  },
  {
    code: 'ENE',
    name: 'East-Northeast',
  },
  {
    code: 'E',
    name: 'East',
  },
  {
    code: 'ESE',
    name: 'East-Southeast',
  },
  {
    code: 'SE',
    name: 'Southeast',
  },
  {
    code: 'SSE',
    name: 'South-Southeast',
  },
  {
    code: 'S',
    name: 'South',
  },
  {
    code: 'SSW',
    name: 'South-Southwest',
  },
  {
    code: 'SW',
    name: 'Southwest',
  },
  {
    code: 'WSW',
    name: 'West-Southwest',
  },
  {
    code: 'W',
    name: 'West',
  },
  {
    code: 'WNW',
    name: 'West-Northwest',
  },
  {
    code: 'NW',
    name: 'Northwest',
  },
  {
    code: 'NNW',
    name: 'North-Northwest',
  },
];

// ==============================
// Exportaciones
// ==============================

module.exports = {
  DIRECTIONS,
};
