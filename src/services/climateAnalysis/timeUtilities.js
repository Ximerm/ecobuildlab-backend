/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: timeUtilities.js
 * --------------------------------------------------------------------
 * Utilidades para manipular series temporales.
 *
 * Este módulo proporciona funciones reutilizables para agrupar datos
 * horarios según diferentes criterios temporales.
 *
 * Actualmente incluye utilidades para agrupar información por mes,
 * pero en futuras versiones podrá ampliarse para soportar
 * agrupaciones por estación, día, hora o cualquier otro período.
 *
 * Este módulo no conoce variables climáticas ni realiza cálculos
 * estadísticos; únicamente organiza la información temporal.
 * --------------------------------------------------------------------
 */

// ==============================
// Funciones privadas
// ==============================

/**
 * Obtiene el mes correspondiente a una fecha.
 *
 * Los meses se representan utilizando la numeración de JavaScript:
 *
 * Enero = 0
 * Febrero = 1
 * ...
 * Diciembre = 11
 *
 * @param {string} dateString Fecha en formato ISO.
 * @returns {number} Mes de la fecha.
 */
function getMonth(dateString) {
  return new Date(dateString).getMonth();
}

// ==============================
// Funciones públicas
// ==============================

/**
 * Agrupa los índices de un arreglo de fechas por mes.
 *
 * El resultado contiene doce arreglos, uno por cada mes del año.
 * Cada arreglo almacena los índices correspondientes a las fechas
 * pertenecientes a ese mes.
 *
 * @param {string[]} time Arreglo de fechas.
 * @returns {number[][]} Índices agrupados por mes.
 */
function groupIndexesByMonth(time) {
  const monthlyIndexes = Array.from({ length: 12 }, () => []);

  time.forEach((date, index) => {
    const month = getMonth(date);

    monthlyIndexes[month].push(index);
  });

  return monthlyIndexes;
}

/**
 * Selecciona un subconjunto de valores utilizando un conjunto
 * de índices.
 *
 * Esta función es reutilizable para cualquier tipo de dato,
 * independientemente de su significado.
 *
 * @template T
 * @param {T[]} values Arreglo de valores.
 * @param {number[]} indexes Índices a seleccionar.
 * @returns {T[]} Valores seleccionados.
 */
function selectValuesByIndexes(values, indexes) {
  return indexes.map((index) => values[index]);
}

/**
 * Agrupa un arreglo de valores por mes utilizando el arreglo
 * de fechas correspondiente.
 *
 * Devuelve un arreglo con doce posiciones, donde cada una
 * contiene los valores pertenecientes a un mes.
 *
 * @template T
 * @param {string[]} time Arreglo de fechas.
 * @param {T[]} values Arreglo de valores.
 * @returns {T[][]} Valores agrupados por mes.
 */
function groupValuesByMonth(time, values) {
  const monthlyIndexes = groupIndexesByMonth(time);

  return monthlyIndexes.map((indexes) => selectValuesByIndexes(values, indexes));
}

// ==============================
// Exportaciones
// ==============================

module.exports = {
  groupIndexesByMonth,

  selectValuesByIndexes,

  groupValuesByMonth,
};
