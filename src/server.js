/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: server.js
 * --------------------------------------------------------------------
 * Punto de entrada de la aplicación.
 *
 * Este módulo carga las variables de entorno e inicia el servidor HTTP.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

require("dotenv").config();

const app = require("./app");

// ==============================
// Configuración
// ==============================

const PORT = process.env.PORT || 3000;

// ==============================
// Inicialización
// ==============================

app.listen(PORT, () => {
  console.log(`🚀 EcoBuildLab server is running on port ${PORT}.`);
});
