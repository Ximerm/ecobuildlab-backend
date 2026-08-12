/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: analysisValidation.js
 * --------------------------------------------------------------------
 * Esquemas de validación para las rutas relacionadas con los
 * análisis bioclimáticos.
 * --------------------------------------------------------------------
 */

const { celebrate, Joi, Segments } = require('celebrate');

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

/**
 * Valida la generación de un análisis.
 */
const generateAnalysisValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    city: Joi.string().trim().required(),
    country: Joi.string().trim().required(),
  }),
});

/**
 * Valida el almacenamiento de un análisis.
 *
 * No valida todo el análisis generado, únicamente la estructura
 * principal requerida para persistirlo.
 */
const saveAnalysisValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    location: Joi.object().required(),

    statistics: Joi.object().required(),

    monthly: Joi.array().items(Joi.object()).required(),

    classification: Joi.object().required(),

    windRose: Joi.object().required(),

    strategies: Joi.array().required(),
  }),
});

/**
 * Valida el parámetro id.
 */
const analysisIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().pattern(objectIdPattern).required(),
  }),
});

module.exports = {
  generateAnalysisValidation,
  saveAnalysisValidation,
  analysisIdValidation,
};
