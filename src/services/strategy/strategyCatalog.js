/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: strategyCatalog.js
 * --------------------------------------------------------------------
 * Catálogo base de estrategias bioclimáticas.
 *
 * Contiene la información descriptiva de las estrategias utilizadas
 * por el módulo de recomendaciones bioclimáticas.
 *
 * No incluye lógica de selección, prioridad, impacto ni
 * recomendaciones específicas para un clima determinado.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const {
  STRATEGY_CODES,
  STRATEGY_CATEGORIES,
  CLIMATE_FACTORS,
} = require('./strategyConstants');

// ==============================
// Catálogo de estrategias
// ==============================

const strategyCatalog = Object.freeze([
  // ===========================================================================
  // Implantación
  // ===========================================================================

  {
    code: STRATEGY_CODES.ORIENTATION,
    order: 1,
    icon: 'orientation',
    category: STRATEGY_CATEGORIES.SITE,
    name: 'Orientación',
    summary:
      'Optimiza la exposición solar y el aprovechamiento del viento para mejorar el confort térmico, reducir la demanda energética y favorecer un mejor desempeño ambiental del edificio.',
    objective:
      'Ubicar y orientar el edificio para aprovechar las condiciones climáticas del sitio, favoreciendo el aprovechamiento de la radiación solar, la ventilación y la iluminación natural.',
    rationale:
      'La orientación es una de las decisiones de diseño más importantes en la arquitectura bioclimática, ya que determina la forma en que el edificio recibe la radiación solar y aprovecha los vientos predominantes. Una orientación adecuada permite controlar las ganancias y pérdidas de calor, mejorar la ventilación cruzada y favorecer el ingreso de iluminación natural. Definir correctamente la orientación desde las primeras etapas del proyecto mejora el confort de los ocupantes, reduce la necesidad de climatización e iluminación artificial y facilita la integración de otras estrategias pasivas.',
    keyFactors: [
      CLIMATE_FACTORS.SOLAR_RADIATION,
      CLIMATE_FACTORS.TEMPERATURE,
      CLIMATE_FACTORS.WIND,
    ],
  },

  // ===========================================================================
  // Envolvente
  // ===========================================================================

  {
    code: STRATEGY_CODES.SOLAR_PROTECTION,
    order: 2,
    icon: 'solar-protection',
    category: STRATEGY_CATEGORIES.ENVELOPE,
    name: 'Protección solar',
    summary:
      'Reduce la ganancia térmica causada por la radiación solar mediante elementos arquitectónicos que controlan la incidencia directa del sol sobre el edificio.',
    objective:
      'Controlar la radiación solar incidente sobre la envolvente para disminuir el sobrecalentamiento, mejorar el confort térmico y reducir la demanda de refrigeración.',
    rationale:
      'La radiación solar directa es una de las principales fuentes de ganancia térmica en los edificios, especialmente en climas cálidos y con alta exposición solar. Incorporar elementos de protección como aleros, voladizos, celosías, pantallas o vegetación permite controlar la incidencia del sol sobre fachadas y ventanas sin impedir completamente el ingreso de iluminación natural. Una protección solar adecuada reduce el sobrecalentamiento interior, mejora el confort de los ocupantes y disminuye el consumo energético asociado a la climatización.',
    keyFactors: [CLIMATE_FACTORS.SOLAR_RADIATION, CLIMATE_FACTORS.TEMPERATURE],
  },

  {
    code: STRATEGY_CODES.WINDOW_DESIGN,
    order: 3,
    icon: 'window-design',
    category: STRATEGY_CATEGORIES.ENVELOPE,
    name: 'Diseño de ventanas',
    summary:
      'Optimiza el tamaño, ubicación, orientación y características de las ventanas para favorecer la iluminación natural, la ventilación y el desempeño térmico del edificio.',
    objective:
      'Diseñar aberturas que equilibren el ingreso de luz, la ventilación natural y el control de las ganancias y pérdidas de calor según las condiciones climáticas.',
    rationale:
      'Las ventanas desempeñan un papel fundamental en el comportamiento bioclimático del edificio, ya que influyen en el ingreso de radiación solar, iluminación natural y ventilación. Su tamaño, orientación, proporción, ubicación y tipo de acristalamiento determinan el intercambio térmico con el exterior. Un diseño adecuado permite mejorar el confort interior, reducir la necesidad de iluminación artificial y optimizar el desempeño energético del edificio, complementando otras estrategias pasivas de la envolvente.',
    keyFactors: [
      CLIMATE_FACTORS.SOLAR_RADIATION,
      CLIMATE_FACTORS.TEMPERATURE,
      CLIMATE_FACTORS.WIND,
    ],
  },

  {
    code: STRATEGY_CODES.THERMAL_INSULATION,
    order: 4,
    icon: 'thermal-insulation',
    category: STRATEGY_CATEGORIES.ENVELOPE,
    name: 'Aislamiento térmico',
    summary:
      'Reduce la transferencia de calor a través de la envolvente para mantener condiciones térmicas interiores más estables y confortables.',
    objective:
      'Controlar el flujo de calor entre el interior y el exterior mediante soluciones constructivas que mejoren el desempeño térmico del edificio.',
    rationale:
      'El aislamiento térmico disminuye la transferencia de calor a través de muros, cubiertas y otros elementos de la envolvente. Su adecuada incorporación permite reducir las pérdidas de calor en climas fríos y limitar las ganancias térmicas en climas cálidos, favoreciendo una temperatura interior más estable. Además de mejorar el confort de los ocupantes, contribuye a disminuir la demanda energética destinada a calefacción o refrigeración.',
    keyFactors: [CLIMATE_FACTORS.TEMPERATURE],
  },

  {
    code: STRATEGY_CODES.MATERIALS_FINISHES,
    order: 5,
    icon: 'materials',
    category: STRATEGY_CATEGORIES.ENVELOPE,
    name: 'Materiales y acabados',
    summary:
      'Selecciona materiales y acabados adecuados al clima para mejorar el desempeño térmico, la durabilidad y la eficiencia ambiental del edificio.',
    objective:
      'Elegir materiales y acabados que respondan a las condiciones climáticas del sitio y contribuyan al confort, la eficiencia energética y la vida útil de la construcción.',
    rationale:
      'Las propiedades térmicas, ópticas y físicas de los materiales influyen directamente en el comportamiento del edificio frente a la radiación solar, la temperatura y la humedad. La selección adecuada de materiales y acabados permite mejorar el confort interior, aumentar la durabilidad de la envolvente, reducir las ganancias de calor o las pérdidas térmicas y complementar otras estrategias pasivas de diseño bioclimático.',
    keyFactors: [
      CLIMATE_FACTORS.TEMPERATURE,
      CLIMATE_FACTORS.SOLAR_RADIATION,
      CLIMATE_FACTORS.HUMIDITY,
      CLIMATE_FACTORS.PRECIPITATION,
    ],
  },

  // ===========================================================================
  // Confort ambiental
  // ===========================================================================

  {
    code: STRATEGY_CODES.NATURAL_VENTILATION,
    order: 6,
    icon: 'natural-ventilation',
    category: STRATEGY_CATEGORIES.COMFORT,
    name: 'Ventilación natural',
    summary:
      'Aprovecha el movimiento natural del aire para favorecer la renovación del ambiente interior, mejorar el confort térmico y reducir la necesidad de climatización mecánica.',
    objective:
      'Promover la circulación natural del aire mediante el diseño adecuado de aberturas y espacios para mejorar el confort térmico y la calidad del aire interior.',
    rationale:
      'La ventilación natural permite renovar el aire interior y disipar el calor acumulado aprovechando las diferencias de presión y la acción del viento. Un diseño adecuado de las aberturas, su ubicación y la configuración de los espacios favorecen la ventilación cruzada y el efecto chimenea cuando las condiciones climáticas lo permiten. Esta estrategia mejora el confort de los ocupantes, contribuye a mantener una buena calidad del aire y reduce la dependencia de sistemas mecánicos de climatización.',
    keyFactors: [
      CLIMATE_FACTORS.WIND,
      CLIMATE_FACTORS.TEMPERATURE,
      CLIMATE_FACTORS.HUMIDITY,
    ],
  },

  {
    code: STRATEGY_CODES.DAYLIGHTING,
    order: 7,
    icon: 'daylighting',
    category: STRATEGY_CATEGORIES.COMFORT,
    name: 'Iluminación natural',
    summary:
      'Favorece el aprovechamiento de la luz natural para mejorar el confort visual y reducir el consumo de iluminación artificial.',
    objective:
      'Maximizar el ingreso uniforme de luz natural mediante un diseño adecuado de los espacios y las aberturas, evitando deslumbramientos y excesivas ganancias térmicas.',
    rationale:
      'La iluminación natural mejora la calidad de los espacios interiores, favorece el bienestar de los ocupantes y reduce el consumo energético asociado a la iluminación artificial. Su aprovechamiento depende de la configuración del edificio, las características de las aberturas, la profundidad de los espacios y el adecuado control de la radiación solar. Una estrategia adecuada permite obtener niveles suficientes de iluminación sin comprometer el confort térmico.',
    keyFactors: [CLIMATE_FACTORS.SOLAR_RADIATION],
  },

  // ===========================================================================
  // Entorno y materiales
  // ===========================================================================

  {
    code: STRATEGY_CODES.VEGETATION,
    order: 8,
    icon: 'vegetation',
    category: STRATEGY_CATEGORIES.LANDSCAPE,
    name: 'Vegetación',
    summary:
      'Integra la vegetación como estrategia bioclimática para mejorar el microclima, proporcionar sombra y aumentar el confort ambiental.',
    objective:
      'Incorporar elementos vegetales que contribuyan al control de la radiación solar, la regulación térmica, la protección frente al viento y la mejora del entorno inmediato del edificio.',
    rationale:
      'La vegetación modifica las condiciones microclimáticas mediante la generación de sombra, la evapotranspiración y la reducción de la temperatura superficial del entorno. Además, puede actuar como barrera frente al viento, favorecer la infiltración del agua y mejorar la calidad ambiental de los espacios exteriores. Su adecuada integración complementa otras estrategias pasivas y fortalece el desempeño bioclimático del edificio.',
    keyFactors: [
      CLIMATE_FACTORS.SOLAR_RADIATION,
      CLIMATE_FACTORS.TEMPERATURE,
      CLIMATE_FACTORS.WIND,
      CLIMATE_FACTORS.HUMIDITY,
      CLIMATE_FACTORS.PRECIPITATION,
    ],
  },
]);

// ==============================
// Exportaciones
// ==============================

module.exports = {
  strategyCatalog,
};
