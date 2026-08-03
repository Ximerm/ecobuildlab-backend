/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: mainController.js
 * --------------------------------------------------------------------
 * Controlador principal de la API.
 *
 * Gestiona las rutas generales de la aplicación, como la página
 * de bienvenida o la verificación de que el servidor se encuentra
 * en funcionamiento.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const STATUS_CODES = require("../constants/statusCodes");

// ==============================
// Constantes
// ==============================

const API_MESSAGE = "EcoBuildLab API is running.";

// ==============================
// Funciones públicas
// ==============================

/**
 * Responde a la ruta principal de la API.
 *
 * Se utiliza como una verificación rápida para confirmar
 * que el servidor está funcionando correctamente.
 *
 * @param {Object} req Solicitud HTTP.
 * @param {Object} res Respuesta HTTP.
 */
function getHome(req, res) {
  res.status(STATUS_CODES.OK).send(API_MESSAGE);
}

// ==============================
// Exportaciones
// ==============================

module.exports = {
  getHome,
};
