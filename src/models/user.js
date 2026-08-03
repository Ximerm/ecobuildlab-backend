/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: user.js
 * --------------------------------------------------------------------
 * Modelo que representa un usuario registrado en EcoBuildLab.
 *
 * Cada usuario puede autenticarse en la plataforma y almacenar
 * sus análisis bioclimáticos personalizados.
 *
 * La contraseña se almacena en forma de hash y nunca se devuelve
 * en las consultas realizadas a la base de datos.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const mongoose = require("mongoose");

const validator = require("validator");

// ==============================
// Esquema
// ==============================

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email address.",
      },
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

// ==============================
// Exportaciones
// ==============================

module.exports = mongoose.model("User", userSchema);
