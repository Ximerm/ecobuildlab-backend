/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: windRose.js
 * --------------------------------------------------------------------
 * Genera la rosa de los vientos a partir de los datos horarios de
 * velocidad y dirección del viento.
 *
 * Este módulo agrupa las observaciones en los sectores definidos en la
 * configuración, calcula las estadísticas de cada dirección y determina
 * la dirección predominante.
 *
 * Las horas cuya velocidad sea inferior al umbral de calma no se asignan
 * a ningún sector y se contabilizan únicamente como condiciones de calma.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const { HOURLY_VARIABLE_KEYS } = require('../../config/api');

const {
  CALM_THRESHOLD,
  SECTOR_ANGLE,
  DIRECTIONS,
} = require('../../config/windRose');

const {
  calculateMean,
  calculateMaximum,
  calculatePercentage,
  round,
} = require('./mathUtilities');

// ==============================
// Constantes
// ==============================

const EMPTY_WIND_ROSE = Object.freeze({
  calm: Object.freeze({
    hours: 0,
    percentage: 0,
  }),

  prevailingDirection: null,

  directions: Object.freeze([]),
});

// ==============================
// Funciones privadas
// ==============================

/**
 * Construye automáticamente los sectores angulares de la rosa de
 * los vientos utilizando la configuración definida.
 *
 * @returns {Object[]} Sectores de la rosa de los vientos.
 */
function buildDirectionSectors() {
  return DIRECTIONS.map((direction, index) => {
    const angle = index * SECTOR_ANGLE;

    const start = (angle - SECTOR_ANGLE / 2 + 360) % 360;

    const end = (angle + SECTOR_ANGLE / 2) % 360;

    return {
      order: index,

      code: direction.code,

      name: direction.name,

      angle,

      start,

      end,
    };
  });
}

/**
 * Inicializa la estructura utilizada para agrupar las observaciones
 * por dirección.
 *
 * @param {Object[]} sectors Sectores de la rosa.
 * @returns {Object[]}
 */
function initializeDirectionGroups(sectors) {
  return sectors.map((sector) => ({
    direction: {
      order: sector.order,

      code: sector.code,

      name: sector.name,

      angle: sector.angle,
    },

    speeds: [],
  }));
}

/**
 * Determina el sector de la rosa de los vientos al que pertenece
 * un ángulo determinado.
 *
 * @param {number} angle Dirección del viento (°).
 * @param {Object[]} sectors Sectores disponibles.
 * @returns {Object|null}
 */
function findDirection(angle, sectors) {
  return sectors.find((sector) => {
    if (sector.start > sector.end) {
      return angle >= sector.start || angle < sector.end;
    }

    return angle >= sector.start && angle < sector.end;
  });
}

/**
 * Agrupa las velocidades según su dirección.
 *
 * Las velocidades inferiores al umbral de calma no se asignan a ningún
 * sector y únicamente incrementan el contador de horas en calma.
 *
 * @param {Object} hourly Datos horarios.
 * @param {Object[]} sectors Sectores de la rosa.
 * @returns {Object}
 */
function groupWindByDirection(hourly, sectors) {
  const windSpeed = hourly[HOURLY_VARIABLE_KEYS.WIND_SPEED];

  const windDirection = hourly[HOURLY_VARIABLE_KEYS.WIND_DIRECTION];

  const groupedDirections = initializeDirectionGroups(sectors);

  // Verifica que ambas series existan
  if (!Array.isArray(windSpeed) || !Array.isArray(windDirection)) {
    return {
      groupedDirections,

      calmHours: 0,

      totalHours: 0,
    };
  }

  let calmHours = 0;

  let validHours = 0;

  windSpeed.forEach((speed, index) => {
    // Ignora velocidades inválidas
    if (speed === null || speed === undefined || Number.isNaN(speed)) {
      return;
    }

    validHours += 1;

    // Condiciones de calma
    if (speed < CALM_THRESHOLD) {
      calmHours += 1;
      return;
    }

    const angle = windDirection[index];

    // Ignora direcciones inválidas
    if (angle === null || angle === undefined || Number.isNaN(angle)) {
      return;
    }

    const direction = findDirection(angle, sectors);

    if (!direction) {
      return;
    }

    groupedDirections[direction.order].speeds.push(speed);
  });

  return {
    groupedDirections,

    calmHours,

    totalHours: validHours,
  };
}

/**
 * Calcula las estadísticas de cada dirección de la rosa de los vientos.
 *
 * @param {Object[]} groupedDirections Direcciones agrupadas.
 * @param {number} totalHours Total de horas válidas.
 * @returns {Object[]} Estadísticas por dirección.
 */
function calculateDirectionStatistics(groupedDirections, totalHours) {
  return groupedDirections.map((group) => {
    const { direction, speeds } = group;

    const hours = speeds.length;

    return {
      ...direction,

      hours,

      percentage: round(calculatePercentage(hours, totalHours)),

      meanSpeed: round(calculateMean(speeds)),

      maximumSpeed: round(calculateMaximum(speeds)),
    };
  });
}

/**
 * Selecciona la dirección con mayor cantidad de horas.
 *
 * En caso de empate, conserva la primera dirección encontrada.
 *
 * @param {Object} prevailing Dirección predominante actual.
 * @param {Object} current Dirección que se está evaluando.
 * @returns {Object} Dirección predominante.
 */
function selectPrevailingDirection(prevailing, current) {
  if (current.hours > prevailing.hours) {
    return current;
  }

  return prevailing;
}

/**
 * Obtiene la dirección predominante.
 *
 * La dirección predominante corresponde al sector con el mayor número
 * de observaciones. En caso de empate, se conserva la primera dirección
 * encontrada.
 *
 * @param {Object[]} directions Estadísticas por dirección.
 * @returns {Object|null} Dirección predominante.
 */
function findPrevailingDirection(directions) {
  const validDirections = directions.filter((direction) => direction.hours > 0);

  if (validDirections.length === 0) {
    return null;
  }

  return validDirections.reduce(selectPrevailingDirection);
}

// ==============================
// Funciones públicas
// ==============================

/**
 * Genera la rosa de los vientos a partir de los datos horarios.
 *
 * @param {Object} hourly Datos horarios obtenidos desde Open-Meteo.
 * @returns {Object} Rosa de los vientos.
 */
function calculateWindRose(hourly) {
  if (!hourly) {
    return EMPTY_WIND_ROSE;
  }

  const sectors = buildDirectionSectors();

  const { groupedDirections, calmHours, totalHours } = groupWindByDirection(
    hourly,
    sectors,
  );

  // No existen observaciones válidas
  if (totalHours === 0) {
    return EMPTY_WIND_ROSE;
  }

  const directions = calculateDirectionStatistics(
    groupedDirections,
    totalHours,
  );

  const prevailingDirection = findPrevailingDirection(directions);

  return {
    calm: {
      hours: calmHours,

      percentage: round(calculatePercentage(calmHours, totalHours)),
    },

    prevailingDirection,

    directions,
  };
}

// ==============================
// Exportaciones
// ==============================

module.exports = {
  calculateWindRose,
};
