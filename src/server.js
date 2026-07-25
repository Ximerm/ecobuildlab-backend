/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: server.js
 * --------------------------------------------------------------------
 * Punto de entrada de la aplicación.
 *
 * Este módulo inicia el servidor HTTP utilizando la aplicación
 * Express configurada en app.js.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const app = require("./app");

// ==============================
// Configuración
// ==============================

/**
 * Puerto utilizado por el servidor.
 *
 * Se obtiene desde las variables de entorno cuando están
 * disponibles; de lo contrario se utiliza el puerto 3000.
 */
const PORT = process.env.PORT || 3000;

// ==============================
// Inicialización
// ==============================

/**
 * Inicia el servidor HTTP.
 */
app.listen(PORT, () => {
  console.log(`🚀 EcoBuildLab server is running on port ${PORT}.`);
});
