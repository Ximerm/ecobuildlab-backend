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

const mongoose = require('mongoose');

const { applicationLogger } = require('../logger/logger');

// ==============================
// Configuración
// ==============================

/**
 * URI de conexión a MongoDB.
 *
 * La URI se obtiene desde DATABASE_URI.
 * En desarrollo se utiliza una conexión local por defecto.
 */
const DATABASE_URI = process.env.NODE_ENV === 'production'
  ? process.env.DATABASE_URI
  : 'mongodb://127.0.0.1:27017/ecobuildlab';

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

    applicationLogger.info('MongoDB connected.');
  } catch (error) {
    applicationLogger.error('MongoDB connection failed.', {
      error: error.message,
    });

    process.exit(1);
  }
}

// ==============================
// Exportaciones
// ==============================

module.exports = connectDB;
