/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: database.js
 * --------------------------------------------------------------------
 * Configuración de la conexión a MongoDB.
 *
 * Este módulo establece la conexión con la base de datos utilizando
 * Mongoose y es llamado una única vez al iniciar el servidor.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const mongoose = require("mongoose");

// ==============================
// Configuración
// ==============================

/**
 * URI de conexión a MongoDB.
 *
 * Temporalmente se utiliza una dirección local.
 * En futuras versiones se leerá desde un archivo .env
 * para facilitar el despliegue en diferentes entornos.
 */
const DATABASE_URI =
  process.env.DATABASE_URI || "mongodb://127.0.0.1:27017/ecobuildlab";

// ==============================
// Funciones públicas
// ==============================

/**
 * Establece la conexión con la base de datos.
 *
 * Si la conexión falla, la aplicación finaliza para evitar
 * ejecutar el servidor sin acceso a la información.
 */
async function connectDB() {
  try {
    await mongoose.connect(DATABASE_URI);

    console.log("✅ MongoDB connected.");
  } catch (error) {
    console.error("❌ MongoDB connection failed.");
    console.error(error.message);

    process.exit(1);
  }
}

// ==============================
// Exportaciones
// ==============================

module.exports = connectDB;
