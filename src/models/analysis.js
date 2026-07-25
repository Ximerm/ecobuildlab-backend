/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: analysis.js
 * --------------------------------------------------------------------
 * Modelo que representa un análisis bioclimático generado por
 * EcoBuildLab.
 *
 * Almacena la ubicación analizada, el resumen estadístico del clima,
 * la clasificación bioclimática y las estrategias pasivas
 * recomendadas para el proyecto.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const mongoose = require("mongoose");

// ==============================
// Subesquemas reutilizables
// ==============================

const locationSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
      trim: true,
    },

    region: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    countryCode: {
      type: String,
      required: true,
      trim: true,
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    elevation: {
      type: Number,
      required: true,
    },

    timezone: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const minMeanMaxSchema = new mongoose.Schema(
  {
    min: {
      type: Number,
      required: true,
    },

    mean: {
      type: Number,
      required: true,
    },

    max: {
      type: Number,
      required: true,
    },

    unit: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const meanSchema = new mongoose.Schema(
  {
    mean: {
      type: Number,
      required: true,
    },

    unit: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const windSchema = new mongoose.Schema(
  {
    speed: {
      type: Number,
      required: true,
    },

    direction: {
      type: String,
      required: true,
    },

    unit: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const precipitationSchema = new mongoose.Schema(
  {
    annualMean: {
      type: Number,
      required: true,
    },

    unit: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const classificationSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    summary: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const recommendationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const metricBreakdownSchema = new mongoose.Schema(
  {
    metric: {
      type: String,
      required: true,
    },

    value: {
      type: Number,
      required: true,
    },

    normalizedScore: {
      type: Number,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    weightedScore: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const impactSchema = new mongoose.Schema(
  {
    score: {
      type: Number,
      required: true,
    },

    level: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      required: true,
      trim: true,
    },

    metricBreakdown: {
      type: [metricBreakdownSchema],
      default: [],
    },
  },
  { _id: false },
);

const strategySchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },

    order: {
      type: Number,
      required: true,
    },

    icon: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    summary: {
      type: String,
      required: true,
      trim: true,
    },

    objective: {
      type: String,
      required: true,
      trim: true,
    },

    rationale: {
      type: String,
      required: true,
      trim: true,
    },

    keyFactors: {
      type: [String],
      default: [],
    },

    impact: {
      type: impactSchema,
      required: true,
    },

    hasRecommendations: {
      type: Boolean,
      required: true,
    },

    recommendations: {
      type: [recommendationSchema],
      default: [],
    },
  },
  { _id: false },
);

// ==============================
// Esquema principal
// ==============================

const analysisSchema = new mongoose.Schema(
  {
    location: {
      type: locationSchema,
      required: true,
    },

    statistics: {
      temperature: {
        type: minMeanMaxSchema,
        required: true,
      },

      humidity: {
        type: minMeanMaxSchema,
        required: true,
      },

      precipitation: {
        type: precipitationSchema,
        required: true,
      },

      wind: {
        type: windSchema,
        required: true,
      },

      radiation: {
        type: meanSchema,
        required: true,
      },

      cloudCover: {
        type: meanSchema,
        required: true,
      },
    },

    classification: {
      type: classificationSchema,
      required: true,
    },

    strategies: {
      type: [strategySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

// ==============================
// Exportaciones
// ==============================

module.exports = mongoose.model("Analysis", analysisSchema);
