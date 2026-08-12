/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: logger.js
 * --------------------------------------------------------------------
 * Configura los mecanismos de registro de la aplicación.
 *
 * Este módulo proporciona:
 * - Un logger general de Winston para registrar eventos de la aplicación.
 * - Un middleware para registrar solicitudes HTTP.
 * - Un middleware para registrar errores de Express.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const expressWinston = require('express-winston');

const winston = require('winston');

// ==============================
// Logger general de la aplicación
// ==============================

const applicationLogger = winston.createLogger({
  format: winston.format.json(),

  transports: [
    new winston.transports.File({
      filename: 'logs/application.log',
    }),
  ],
});

// ==============================
// Logger de solicitudes
// ==============================

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'logs/request.log',
    }),
  ],

  format: winston.format.json(),
});

// ==============================
// Logger de errores
// ==============================

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
    }),
  ],

  format: winston.format.json(),
});

// ==============================
// Exportaciones
// ==============================

module.exports = {
  applicationLogger,
  requestLogger,
  errorLogger,
};
