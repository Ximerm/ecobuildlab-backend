/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: impactScale.js
 * --------------------------------------------------------------------
 * Define los niveles de impacto utilizados para clasificar
 * el puntaje estimado de cada estrategia bioclimática.
 *
 * Los niveles se determinan a partir de un puntaje normalizado
 * entre 0 y 100.
 * --------------------------------------------------------------------
 */

// ==============================
// Niveles de impacto
// ==============================

const IMPACT_LEVELS = Object.freeze([
  {
    min: 0,
    max: 25,
    level: 'low',
    label: 'Bajo',
  },
  {
    min: 26,
    max: 50,
    level: 'moderate',
    label: 'Moderado',
  },
  {
    min: 51,
    max: 75,
    level: 'high',
    label: 'Alto',
  },
  {
    min: 76,
    max: 100,
    level: 'very-high',
    label: 'Muy alto',
  },
]);

// ==============================
// Funciones públicas
// ==============================

/**
 * Obtiene el nivel de impacto correspondiente a un puntaje.
 *
 * @param {number} score Puntaje de impacto entre 0 y 100.
 * @returns {{
 *   score: number,
 *   level: string,
 *   label: string
 * }}
 */

function getImpactLevel(score) {
  const normalizedScore = Math.max(0, Math.min(100, Math.round(score)));

  const impactLevel = IMPACT_LEVELS.find(
    ({ min, max }) => normalizedScore >= min && normalizedScore <= max,
  ) ?? IMPACT_LEVELS[0];

  return {
    score: normalizedScore,
    level: impactLevel.level,
    label: impactLevel.label,
  };
}

// ==============================
// Exportaciones
// ==============================

module.exports = {
  IMPACT_LEVELS,
  getImpactLevel,
};
