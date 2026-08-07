/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: logger.js
 * --------------------------------------------------------------------
 * Configura los middlewares encargados de registrar todas las
 * solicitudes HTTP y los errores de la aplicación.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const expressWinston = require("express-winston");

const winston = require("winston");

// ==============================
// Logger de solicitudes
// ==============================

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: "logs/request.log",
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
      filename: "logs/error.log",
    }),
  ],

  format: winston.format.json(),
});

// ==============================
// Exportaciones
// ==============================

module.exports = {
  requestLogger,
  errorLogger,
};
