/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: strategyRecommendations.js
 * --------------------------------------------------------------------
 * Catálogo de recomendaciones bioclimáticas.
 *
 * Contiene las acciones de diseño asociadas a cada estrategia
 * bioclimática y las condiciones climáticas que determinan
 * cuándo deben aplicarse.
 *
 * Las recomendaciones son acumulativas y pueden activarse
 * simultáneamente cuando las condiciones climáticas lo justifican.
 * --------------------------------------------------------------------
 */

// -----------------------------------------------------------------------------
// Dependencias
// -----------------------------------------------------------------------------

const {
  STRATEGY_CODES,
  RECOMMENDATION_PRIORITY,
  CLIMATE_METRICS,
} = require('./strategyConstants');

const {
  THERMAL_ZONE_CODES,
  MOISTURE_ZONE_CODES,
} = require('../../constants/caldasLang');

// -----------------------------------------------------------------------------
// Catálogo de recomendaciones bioclimáticas
// -----------------------------------------------------------------------------
//
// Cada recomendación representa una acción de diseño que complementa una
// estrategia bioclimática.
//
// Las recomendaciones son acumulativas. Una estrategia puede activar varias
// recomendaciones cuando las condiciones climáticas lo justifican.
//
// strategyGenerator.js será el encargado de:
//
// - Evaluar las condiciones.
// - Seleccionar las recomendaciones aplicables.
// - Ordenarlas según su prioridad.
//
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Condiciones
// -----------------------------------------------------------------------------
//
// Cada recomendación puede activarse mediante:
//
// - thermalZones
// - moistureZones
// - metrics
//
// Todos los criterios son opcionales.
//
// Si:
//
// conditions: {}
//
// la recomendación siempre será aplicable.
//
// -----------------------------------------------------------------------------

const strategyRecommendations = Object.freeze({
  // ===========================================================================
  // Protección solar
  // ===========================================================================

  [STRATEGY_CODES.SOLAR_PROTECTION]: [
    {
      id: 'horizontal-overhangs',
      priority: RECOMMENDATION_PRIORITY.HIGH,
      conditions: {
        thermalZones: [THERMAL_ZONE_CODES.WARM, THERMAL_ZONE_CODES.TEMPERATE],
        metrics: {
          [CLIMATE_METRICS.SOLAR_RADIATION]: {
            min: 5,
          },
        },
      },
      text: 'Incorporar aleros horizontales en las fachadas con mayor exposición solar para reducir la radiación directa.',
    },

    {
      id: 'vertical-shading',
      priority: RECOMMENDATION_PRIORITY.HIGH,
      conditions: {
        thermalZones: [THERMAL_ZONE_CODES.WARM, THERMAL_ZONE_CODES.TEMPERATE],
      },
      text: 'Utilizar elementos de protección vertical en fachadas con mayor exposición al sol de baja altura.',
    },

    {
      id: 'external-window-shading',
      priority: RECOMMENDATION_PRIORITY.HIGH,
      conditions: {
        thermalZones: [THERMAL_ZONE_CODES.WARM, THERMAL_ZONE_CODES.TEMPERATE],
      },
      text: 'Incorporar dispositivos de sombreado exterior en las ventanas para disminuir las ganancias térmicas.',
    },

    {
      id: 'vegetation-shade',
      priority: RECOMMENDATION_PRIORITY.MEDIUM,
      conditions: {
        thermalZones: [THERMAL_ZONE_CODES.WARM, THERMAL_ZONE_CODES.TEMPERATE],
      },
      text: 'Integrar vegetación para proporcionar sombra sobre fachadas, cubiertas y espacios exteriores.',
    },

    {
      id: 'reflective-finishes',
      priority: RECOMMENDATION_PRIORITY.MEDIUM,
      conditions: {
        metrics: {
          [CLIMATE_METRICS.SOLAR_RADIATION]: {
            min: 5,
          },
        },
      },
      text: 'Utilizar acabados exteriores de alta reflectancia para disminuir la absorción de calor.',
    },

    {
      id: 'optimize-shading',
      priority: RECOMMENDATION_PRIORITY.LOW,
      conditions: {},
      text: 'Dimensionar los elementos de protección solar de acuerdo con la orientación y las condiciones climáticas del sitio.',
    },
  ],

  // ===========================================================================
  // Orientación
  // ===========================================================================

  [STRATEGY_CODES.ORIENTATION]: [
    {
      id: 'minimize-east-west-exposure',
      priority: RECOMMENDATION_PRIORITY.HIGH,
      conditions: {
        thermalZones: [THERMAL_ZONE_CODES.WARM, THERMAL_ZONE_CODES.TEMPERATE],
      },
      text: 'Reducir la exposición de las fachadas más críticas a la radiación solar mediante una adecuada implantación del edificio.',
    },

    {
      id: 'capture-solar-gains',
      priority: RECOMMENDATION_PRIORITY.HIGH,
      conditions: {
        thermalZones: [THERMAL_ZONE_CODES.COLD, THERMAL_ZONE_CODES.PARAMO],
      },
      text: 'Orientar los espacios principales para favorecer el aprovechamiento de las ganancias solares durante las épocas frías.',
    },

    {
      id: 'take-advantage-prevailing-winds',
      priority: RECOMMENDATION_PRIORITY.HIGH,
      conditions: {
        metrics: {
          [CLIMATE_METRICS.AVERAGE_WIND_SPEED]: {
            min: 2,
          },
        },
      },
      text: 'Orientar la edificación para favorecer el aprovechamiento de los vientos predominantes y mejorar la ventilación natural.',
    },

    {
      id: 'protect-from-cold-winds',
      priority: RECOMMENDATION_PRIORITY.MEDIUM,
      conditions: {
        thermalZones: [THERMAL_ZONE_CODES.COLD, THERMAL_ZONE_CODES.PARAMO],
      },
      text: 'Reducir la exposición a los vientos fríos mediante la ubicación y configuración de la edificación.',
    },

    {
      id: 'organize-by-thermal-requirements',
      priority: RECOMMENDATION_PRIORITY.LOW,
      conditions: {},
      text: 'Distribuir los espacios interiores de acuerdo con sus requerimientos de confort y las condiciones climáticas del sitio.',
    },
  ],

  // ===========================================================================
  // Diseño de ventanas
  // ===========================================================================

  [STRATEGY_CODES.WINDOW_DESIGN]: [
    {
      id: 'optimize-window-to-wall-ratio',
      priority: RECOMMENDATION_PRIORITY.HIGH,
      conditions: {},
      text: 'Dimensionar el área de las ventanas de acuerdo con las necesidades de iluminación, ventilación y control térmico del edificio.',
    },

    {
      id: 'reduce-glazing-in-hot-climates',
      priority: RECOMMENDATION_PRIORITY.HIGH,
      conditions: {
        thermalZones: [THERMAL_ZONE_CODES.WARM],
      },
      text: 'Limitar superficies acristaladas excesivas en fachadas expuestas para reducir las ganancias térmicas.',
    },

    {
      id: 'increase-solar-admission-in-cold-climates',
      priority: RECOMMENDATION_PRIORITY.HIGH,
      conditions: {
        thermalZones: [THERMAL_ZONE_CODES.COLD, THERMAL_ZONE_CODES.PARAMO],
      },
      text: 'Favorecer la captación de radiación solar mediante un diseño adecuado de las superficies acristaladas.',
    },

    {
      id: 'high-performance-glazing',
      priority: RECOMMENDATION_PRIORITY.MEDIUM,
      conditions: {},
      text: 'Seleccionar sistemas de acristalamiento con propiedades térmicas acordes con las condiciones climáticas del sitio.',
    },

    {
      id: 'operable-windows',
      priority: RECOMMENDATION_PRIORITY.MEDIUM,
      conditions: {
        metrics: {
          [CLIMATE_METRICS.AVERAGE_WIND_SPEED]: {
            min: 1.5,
          },
        },
      },
      text: 'Incorporar ventanas operables que permitan regular la ventilación natural cuando las condiciones exteriores sean favorables.',
    },

    {
      id: 'daylight-distribution',
      priority: RECOMMENDATION_PRIORITY.LOW,
      conditions: {},
      text: 'Ubicar y distribuir las ventanas para favorecer una iluminación natural uniforme en los espacios interiores.',
    },
  ],

  // ===========================================================================
  // Ventilación natural
  // ===========================================================================

  [STRATEGY_CODES.NATURAL_VENTILATION]: [
    {
      id: 'cross-ventilation',
      priority: RECOMMENDATION_PRIORITY.HIGH,
      conditions: {
        metrics: {
          [CLIMATE_METRICS.AVERAGE_WIND_SPEED]: {
            min: 2,
          },
        },
      },
      text: 'Favorecer la ventilación cruzada mediante recorridos continuos del aire entre fachadas opuestas o adyacentes.',
    },

    {
      id: 'stack-ventilation',
      priority: RECOMMENDATION_PRIORITY.HIGH,
      conditions: {
        thermalZones: [THERMAL_ZONE_CODES.WARM, THERMAL_ZONE_CODES.TEMPERATE],
      },
      text: 'Incorporar diferencias de altura entre las entradas y salidas de aire para favorecer el efecto chimenea y la extracción del aire caliente.',
    },

    {
      id: 'night-ventilation',
      priority: RECOMMENDATION_PRIORITY.MEDIUM,
      conditions: {
        thermalZones: [THERMAL_ZONE_CODES.WARM],
      },
      text: 'Aprovechar la ventilación nocturna para disipar el calor acumulado cuando las condiciones exteriores sean favorables.',
    },

    {
      id: 'airflow-obstacles',
      priority: RECOMMENDATION_PRIORITY.MEDIUM,
      conditions: {},
      text: 'Evitar obstáculos interiores que limiten el recorrido natural del aire entre los diferentes espacios.',
    },

    {
      id: 'protect-from-excessive-winds',
      priority: RECOMMENDATION_PRIORITY.MEDIUM,
      conditions: {
        metrics: {
          [CLIMATE_METRICS.AVERAGE_WIND_SPEED]: {
            min: 6,
          },
        },
      },
      text: 'Incorporar elementos que permitan controlar velocidades elevadas del viento para mantener el confort de los ocupantes.',
    },

    {
      id: 'natural-air-renewal',
      priority: RECOMMENDATION_PRIORITY.LOW,
      conditions: {},
      text: 'Favorecer la renovación continua del aire interior mediante estrategias pasivas acordes con las condiciones climáticas del sitio.',
    },
  ],

  // ===========================================================================
  // Aislamiento térmico
  // ===========================================================================

  [STRATEGY_CODES.THERMAL_INSULATION]: [
    {
      id: 'continuous-insulation',
      priority: RECOMMENDATION_PRIORITY.HIGH,
      conditions: {
        thermalZones: [THERMAL_ZONE_CODES.COLD, THERMAL_ZONE_CODES.PARAMO],
      },
      text: 'Incorporar aislamiento térmico continuo en la envolvente para reducir las pérdidas de calor.',
    },

    {
      id: 'roof-insulation',
      priority: RECOMMENDATION_PRIORITY.HIGH,
      conditions: {
        thermalZones: [
          THERMAL_ZONE_CODES.WARM,
          THERMAL_ZONE_CODES.COLD,
          THERMAL_ZONE_CODES.PARAMO,
        ],
      },
      text: 'Priorizar el aislamiento térmico de la cubierta para reducir el intercambio de calor con el exterior.',
    },

    {
      id: 'wall-insulation',
      priority: RECOMMENDATION_PRIORITY.MEDIUM,
      conditions: {},
      text: 'Mejorar el desempeño térmico de los muros exteriores mediante soluciones de aislamiento acordes con el clima.',
    },

    {
      id: 'thermal-bridge-control',
      priority: RECOMMENDATION_PRIORITY.MEDIUM,
      conditions: {},
      text: 'Reducir los puentes térmicos en las uniones de la envolvente para mejorar la eficiencia energética.',
    },

    {
      id: 'floor-insulation',
      priority: RECOMMENDATION_PRIORITY.LOW,
      conditions: {
        thermalZones: [THERMAL_ZONE_CODES.COLD, THERMAL_ZONE_CODES.PARAMO],
      },
      text: 'Considerar el aislamiento térmico de los pisos en contacto con el terreno o con espacios no acondicionados.',
    },

    {
      id: 'insulation-level',
      priority: RECOMMENDATION_PRIORITY.LOW,
      conditions: {},
      text: 'Seleccionar el nivel de aislamiento térmico de acuerdo con las condiciones climáticas y el desempeño esperado de la edificación.',
    },
  ],

  // ===========================================================================
  // Iluminación natural
  // ===========================================================================

  [STRATEGY_CODES.DAYLIGHTING]: [
    {
      id: 'maximize-daylight',
      priority: RECOMMENDATION_PRIORITY.HIGH,
      conditions: {},
      text: 'Favorecer el ingreso de luz natural para reducir la dependencia de iluminación artificial durante el día.',
    },

    {
      id: 'uniform-daylight-distribution',
      priority: RECOMMENDATION_PRIORITY.HIGH,
      conditions: {},
      text: 'Distribuir la iluminación natural de forma uniforme para evitar zonas con excesivo contraste lumínico.',
    },

    {
      id: 'control-glare',
      priority: RECOMMENDATION_PRIORITY.HIGH,
      conditions: {
        metrics: {
          [CLIMATE_METRICS.SOLAR_RADIATION]: {
            min: 5,
          },
        },
      },
      text: 'Controlar el deslumbramiento mediante soluciones pasivas que mantengan el confort visual.',
    },

    {
      id: 'reflect-light-surfaces',
      priority: RECOMMENDATION_PRIORITY.MEDIUM,
      conditions: {},
      text: 'Incorporar superficies interiores de alta reflectancia para favorecer una mejor distribución de la luz natural.',
    },

    {
      id: 'daylight-deep-spaces',
      priority: RECOMMENDATION_PRIORITY.MEDIUM,
      conditions: {},
      text: 'Favorecer el ingreso de luz natural hacia las zonas más profundas de los espacios interiores cuando sea posible.',
    },

    {
      id: 'balance-daylight-thermal-comfort',
      priority: RECOMMENDATION_PRIORITY.LOW,
      conditions: {},
      text: 'Equilibrar el aprovechamiento de la iluminación natural con el control de las ganancias térmicas para mantener el confort interior.',
    },
  ],

  // ===========================================================================
  // Vegetación
  // ===========================================================================

  [STRATEGY_CODES.VEGETATION]: [
    {
      id: 'deciduous-trees',
      priority: RECOMMENDATION_PRIORITY.HIGH,
      conditions: {
        thermalZones: [THERMAL_ZONE_CODES.WARM, THERMAL_ZONE_CODES.TEMPERATE],
      },
      text: 'Incorporar árboles que proporcionen sombra sobre fachadas, cubiertas y espacios exteriores para reducir la radiación solar directa.',
    },

    {
      id: 'windbreaks',
      priority: RECOMMENDATION_PRIORITY.HIGH,
      conditions: {
        thermalZones: [THERMAL_ZONE_CODES.COLD, THERMAL_ZONE_CODES.PARAMO],
      },
      text: 'Utilizar barreras vegetales para disminuir la velocidad de los vientos predominantes y mejorar el confort exterior.',
    },

    {
      id: 'native-species',
      priority: RECOMMENDATION_PRIORITY.MEDIUM,
      conditions: {},
      text: 'Priorizar especies vegetales nativas o adaptadas al clima local para reducir el consumo de agua y facilitar el mantenimiento.',
    },

    {
      id: 'evapotranspiration',
      priority: RECOMMENDATION_PRIORITY.MEDIUM,
      conditions: {
        moistureZones: [
          MOISTURE_ZONE_CODES.ARID,
          MOISTURE_ZONE_CODES.SEMI_ARID,
        ],
      },
      text: 'Incorporar vegetación que contribuya al enfriamiento del entorno mediante evapotranspiración cuando la disponibilidad hídrica lo permita.',
    },

    {
      id: 'green-areas',
      priority: RECOMMENDATION_PRIORITY.LOW,
      conditions: {},
      text: 'Distribuir áreas verdes para mejorar el microclima y reducir el efecto de isla de calor alrededor de la edificación.',
    },

    {
      id: 'vegetation-maintenance',
      priority: RECOMMENDATION_PRIORITY.LOW,
      conditions: {},
      text: 'Planificar el mantenimiento de la vegetación para garantizar su desempeño ambiental a largo plazo.',
    },
  ],

  // ===========================================================================
  // Materiales y acabados
  // ===========================================================================

  [STRATEGY_CODES.MATERIALS_FINISHES]: [
    {
      id: 'high-thermal-mass',
      priority: RECOMMENDATION_PRIORITY.HIGH,
      conditions: {
        thermalZones: [THERMAL_ZONE_CODES.TEMPERATE, THERMAL_ZONE_CODES.COLD],
      },
      text: 'Utilizar materiales con alta inercia térmica para estabilizar las variaciones de temperatura interior cuando las condiciones climáticas lo favorezcan.',
    },

    {
      id: 'light-colored-finishes',
      priority: RECOMMENDATION_PRIORITY.HIGH,
      conditions: {
        thermalZones: [THERMAL_ZONE_CODES.WARM],
      },
      text: 'Emplear acabados exteriores de colores claros o alta reflectancia para disminuir la absorción de radiación solar.',
    },

    {
      id: 'low-conductivity-materials',
      priority: RECOMMENDATION_PRIORITY.MEDIUM,
      conditions: {},
      text: 'Seleccionar materiales con propiedades térmicas acordes con el clima para mejorar el desempeño de la envolvente.',
    },

    {
      id: 'durable-materials',
      priority: RECOMMENDATION_PRIORITY.MEDIUM,
      conditions: {},
      text: 'Priorizar materiales durables y de bajo mantenimiento que respondan adecuadamente a las condiciones ambientales del sitio.',
    },

    {
      id: 'local-materials',
      priority: RECOMMENDATION_PRIORITY.LOW,
      conditions: {},
      text: 'Favorecer el uso de materiales locales para reducir el impacto ambiental asociado al transporte y fortalecer la economía regional.',
    },

    {
      id: 'low-environmental-impact',
      priority: RECOMMENDATION_PRIORITY.LOW,
      conditions: {},
      text: 'Seleccionar materiales con bajo impacto ambiental considerando su ciclo de vida y su desempeño durante la operación del edificio.',
    },
  ],
});

// -----------------------------------------------------------------------------
// Exportaciones
// -----------------------------------------------------------------------------

module.exports = {
  strategyRecommendations,
};
