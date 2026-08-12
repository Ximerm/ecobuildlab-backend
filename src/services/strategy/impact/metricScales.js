/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: metricScales.js
 * --------------------------------------------------------------------
 * Escalas de referencia utilizadas para normalizar variables
 * climáticas y convertirlas en un puntaje de impacto entre 0 y 100.
 *
 * Los valores de referencia están orientados a climas tropicales
 * y subtropicales, y son independientes de cualquier sistema de
 * clasificación climática (Caldas-Lang, Köppen-Geiger, etc.).
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const { CLIMATE_METRICS } = require('../strategyConstants');

// ==============================
// Escalas de métricas
// ==============================

const METRIC_SCALES = Object.freeze({
  [CLIMATE_METRICS.SOLAR_RADIATION]: {
    label: 'Radiación solar',
    unit: 'kWh/m²·día',
    referencePoints: [
      {
        score: 0,
        value: 2.5,
      },
      {
        score: 20,
        value: 3.5,
      },
      {
        score: 50,
        value: 4.5,
      },
      {
        score: 80,
        value: 5.5,
      },
      {
        score: 100,
        value: 6.5,
      },
    ],
  },

  [CLIMATE_METRICS.MAX_TEMPERATURE]: {
    label: 'Temperatura máxima',
    unit: '°C',
    referencePoints: [
      {
        score: 0,
        value: 20,
      },
      {
        score: 20,
        value: 25,
      },
      {
        score: 50,
        value: 30,
      },
      {
        score: 80,
        value: 35,
      },
      {
        score: 100,
        value: 40,
      },
    ],
  },

  [CLIMATE_METRICS.AVERAGE_TEMPERATURE]: {
    label: 'Temperatura media',
    unit: '°C',
    referencePoints: [
      {
        score: 0,
        value: 15,
      },
      {
        score: 20,
        value: 20,
      },
      {
        score: 50,
        value: 24,
      },
      {
        score: 80,
        value: 28,
      },
      {
        score: 100,
        value: 32,
      },
    ],
  },

  [CLIMATE_METRICS.MIN_TEMPERATURE]: {
    label: 'Temperatura mínima',
    unit: '°C',
    referencePoints: [
      {
        score: 100,
        value: 5,
      },
      {
        score: 60,
        value: 10,
      },
      {
        score: 20,
        value: 18,
      },
      {
        score: 60,
        value: 24,
      },
      {
        score: 100,
        value: 28,
      },
    ],
  },

  [CLIMATE_METRICS.RELATIVE_HUMIDITY]: {
    label: 'Humedad relativa',
    unit: '%',
    referencePoints: [
      {
        score: 0,
        value: 30,
      },
      {
        score: 20,
        value: 45,
      },
      {
        score: 50,
        value: 60,
      },
      {
        score: 80,
        value: 75,
      },
      {
        score: 100,
        value: 90,
      },
    ],
  },

  [CLIMATE_METRICS.ANNUAL_PRECIPITATION]: {
    label: 'Precipitación anual',
    unit: 'mm',
    referencePoints: [
      {
        score: 0,
        value: 300,
      },
      {
        score: 20,
        value: 800,
      },
      {
        score: 50,
        value: 1500,
      },
      {
        score: 80,
        value: 2500,
      },
      {
        score: 100,
        value: 4000,
      },
    ],
  },

  [CLIMATE_METRICS.AVERAGE_WIND_SPEED]: {
    label: 'Velocidad media del viento',
    unit: 'm/s',
    referencePoints: [
      {
        score: 100,
        value: 0.5,
      },
      {
        score: 80,
        value: 1.5,
      },
      {
        score: 50,
        value: 3,
      },
      {
        score: 20,
        value: 5,
      },
      {
        score: 0,
        value: 8,
      },
    ],
  },
});

// ==============================
// Exportaciones
// ==============================

module.exports = {
  METRIC_SCALES,
};
