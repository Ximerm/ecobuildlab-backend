/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: rateLimiter.js
 * --------------------------------------------------------------------
 * Configuración del limitador de solicitudes HTTP.
 * --------------------------------------------------------------------
 */

const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 100,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    message: "Too many requests. Please try again later.",
  },
});

module.exports = rateLimiter;
