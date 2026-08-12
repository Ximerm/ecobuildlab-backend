/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: strategyConstants.js
 * --------------------------------------------------------------------
 * Constantes utilizadas por el módulo de estrategias bioclimáticas.
 *
 * Centraliza los códigos, categorías, factores climáticos,
 * prioridades y métricas utilizadas por el motor de recomendaciones.
 * --------------------------------------------------------------------
 */

// -----------------------------------------------------------------------------
// Códigos de estrategias bioclimáticas
// -----------------------------------------------------------------------------
//
// Identificadores únicos utilizados en todo el módulo de estrategias.
//
// Se emplean para relacionar:
//
// • strategyCatalog
// • strategyRecommendations
// • strategyGenerator
// • strategyImpact
//
// -----------------------------------------------------------------------------

const STRATEGY_CODES = Object.freeze({
  ORIENTATION: 'ORIENTATION',
  SOLAR_PROTECTION: 'SOLAR_PROTECTION',
  WINDOW_DESIGN: 'WINDOW_DESIGN',
  NATURAL_VENTILATION: 'NATURAL_VENTILATION',
  THERMAL_INSULATION: 'THERMAL_INSULATION',
  DAYLIGHTING: 'DAYLIGHTING',
  VEGETATION: 'VEGETATION',
  MATERIALS_FINISHES: 'MATERIALS_FINISHES',
});

// -----------------------------------------------------------------------------
// Categorías de estrategias
// -----------------------------------------------------------------------------
//
// Agrupan las estrategias según el componente del proyecto sobre el que actúan.
//
// -----------------------------------------------------------------------------

const STRATEGY_CATEGORIES = Object.freeze({
  SITE: 'site',
  ENVELOPE: 'envelope',
  COMFORT: 'comfort',
  LANDSCAPE: 'landscape',
});

// -----------------------------------------------------------------------------
// Factores climáticos
// -----------------------------------------------------------------------------
//
// Factores climáticos generales sobre los que actúa una estrategia.
//
// No representan datos medidos, sino aspectos climáticos considerados durante
// el diseño bioclimático.
//
// -----------------------------------------------------------------------------

const CLIMATE_FACTORS = Object.freeze({
  TEMPERATURE: 'temperature',
  SOLAR_RADIATION: 'solarRadiation',
  WIND: 'wind',
  HUMIDITY: 'humidity',
  PRECIPITATION: 'precipitation',
});

// -----------------------------------------------------------------------------
// Prioridades de recomendación
// -----------------------------------------------------------------------------
//
// Indican la importancia relativa de cada recomendación.
//
// Posteriormente podrán utilizarse para:
//
// • Ordenar recomendaciones.
// • Calcular el impacto de una estrategia.
// • Destacar visualmente las recomendaciones más relevantes.
//
// -----------------------------------------------------------------------------

const RECOMMENDATION_PRIORITY = Object.freeze({
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
});

// -----------------------------------------------------------------------------
// Métricas climáticas
// -----------------------------------------------------------------------------
//
// Variables climáticas procesadas a partir de Open-Meteo.
//
// Complementan la clasificación Caldas-Lang y permiten generar
// recomendaciones más específicas.
//
// Todas las métricas son opcionales dentro de una condición.
//
// -----------------------------------------------------------------------------

const CLIMATE_METRICS = Object.freeze({
  AVERAGE_TEMPERATURE: 'averageTemperature',
  MAX_TEMPERATURE: 'maxTemperature',
  MIN_TEMPERATURE: 'minTemperature',

  SOLAR_RADIATION: 'solarRadiation',

  AVERAGE_WIND_SPEED: 'averageWindSpeed',

  RELATIVE_HUMIDITY: 'relativeHumidity',

  ANNUAL_PRECIPITATION: 'annualPrecipitation',
});

// -----------------------------------------------------------------------------
// Exportaciones
// -----------------------------------------------------------------------------

module.exports = {
  STRATEGY_CODES,
  STRATEGY_CATEGORIES,
  CLIMATE_FACTORS,
  RECOMMENDATION_PRIORITY,
  CLIMATE_METRICS,
};
