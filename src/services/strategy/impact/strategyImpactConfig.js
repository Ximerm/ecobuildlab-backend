/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: strategyImpactConfig.js
 * --------------------------------------------------------------------
 * Configuración utilizada para calcular el impacto estimado
 * de cada estrategia bioclimática.
 *
 * Cada estrategia define:
 *
 * - Las variables climáticas que influyen en su impacto.
 * - El peso relativo de cada variable.
 *
 * La suma de los pesos debe ser siempre 100 para permitir
 * el cálculo de un promedio ponderado.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const { STRATEGY_CODES, CLIMATE_METRICS } = require('../strategyConstants');

// ==============================
// Configuración de impacto
// ==============================

const STRATEGY_IMPACT_CONFIG = Object.freeze({
  [STRATEGY_CODES.SOLAR_PROTECTION]: {
    metrics: [
      {
        metric: CLIMATE_METRICS.SOLAR_RADIATION,
        weight: 70,
      },
      {
        metric: CLIMATE_METRICS.MAX_TEMPERATURE,
        weight: 30,
      },
    ],
  },

  [STRATEGY_CODES.ORIENTATION]: {
    metrics: [
      {
        metric: CLIMATE_METRICS.SOLAR_RADIATION,
        weight: 35,
      },
      {
        metric: CLIMATE_METRICS.AVERAGE_WIND_SPEED,
        weight: 35,
      },
      {
        metric: CLIMATE_METRICS.MAX_TEMPERATURE,
        weight: 30,
      },
    ],
  },

  [STRATEGY_CODES.WINDOW_DESIGN]: {
    metrics: [
      {
        metric: CLIMATE_METRICS.SOLAR_RADIATION,
        weight: 35,
      },
      {
        metric: CLIMATE_METRICS.AVERAGE_WIND_SPEED,
        weight: 35,
      },
      {
        metric: CLIMATE_METRICS.MAX_TEMPERATURE,
        weight: 30,
      },
    ],
  },

  [STRATEGY_CODES.THERMAL_INSULATION]: {
    metrics: [
      {
        metric: CLIMATE_METRICS.MAX_TEMPERATURE,
        weight: 35,
      },
      {
        metric: CLIMATE_METRICS.MIN_TEMPERATURE,
        weight: 35,
      },
      {
        metric: CLIMATE_METRICS.AVERAGE_TEMPERATURE,
        weight: 30,
      },
    ],
  },

  [STRATEGY_CODES.MATERIALS_FINISHES]: {
    metrics: [
      {
        metric: CLIMATE_METRICS.AVERAGE_TEMPERATURE,
        weight: 35,
      },
      {
        metric: CLIMATE_METRICS.SOLAR_RADIATION,
        weight: 30,
      },
      {
        metric: CLIMATE_METRICS.RELATIVE_HUMIDITY,
        weight: 20,
      },
      {
        metric: CLIMATE_METRICS.ANNUAL_PRECIPITATION,
        weight: 15,
      },
    ],
  },

  [STRATEGY_CODES.NATURAL_VENTILATION]: {
    metrics: [
      {
        metric: CLIMATE_METRICS.AVERAGE_WIND_SPEED,
        weight: 50,
      },
      {
        metric: CLIMATE_METRICS.MAX_TEMPERATURE,
        weight: 35,
      },
      {
        metric: CLIMATE_METRICS.RELATIVE_HUMIDITY,
        weight: 15,
      },
    ],
  },

  [STRATEGY_CODES.DAYLIGHTING]: {
    metrics: [
      {
        metric: CLIMATE_METRICS.SOLAR_RADIATION,
        weight: 100,
      },
    ],
  },

  [STRATEGY_CODES.VEGETATION]: {
    metrics: [
      {
        metric: CLIMATE_METRICS.SOLAR_RADIATION,
        weight: 30,
      },
      {
        metric: CLIMATE_METRICS.MAX_TEMPERATURE,
        weight: 30,
      },
      {
        metric: CLIMATE_METRICS.ANNUAL_PRECIPITATION,
        weight: 20,
      },
      {
        metric: CLIMATE_METRICS.RELATIVE_HUMIDITY,
        weight: 10,
      },
      {
        metric: CLIMATE_METRICS.AVERAGE_WIND_SPEED,
        weight: 10,
      },
    ],
  },
});

// ==============================
// Exportaciones
// ==============================

module.exports = {
  STRATEGY_IMPACT_CONFIG,
};
