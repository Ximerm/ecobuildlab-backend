/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: analysis.js
 * --------------------------------------------------------------------
 * Modelo que representa un análisis bioclimático generado por
 * EcoBuildLab.
 *
 * Almacena la ubicación analizada, los resultados del análisis
 * climático, la clasificación bioclimática y las estrategias pasivas
 * recomendadas para el proyecto.
 *
 * Durante el desarrollo del motor climático, las estructuras de
 * estadísticas, análisis mensual y rosa de los vientos se almacenan
 * como objetos flexibles. Una vez estabilizado el modelo de dominio,
 * estos campos podrán sustituirse por subesquemas específicos.
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

    /**
     * Descripción corta del perfil climático.
     *
     * Se incorporará cuando se complete el modelo
     * de perfiles bioclimáticos.
     */
    summary: {
      type: String,
      default: "",
      trim: true,
    },

    /**
     * Descripción detallada del perfil climático.
     *
     * Se incorporará cuando se complete el modelo
     * de perfiles bioclimáticos.
     */
    description: {
      type: String,
      default: "",
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
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    location: {
      type: locationSchema,
      required: true,
    },

    statistics: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    monthly: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    classification: {
      type: classificationSchema,
      required: true,
    },

    windRose: {
      type: mongoose.Schema.Types.Mixed,
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
