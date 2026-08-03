/**
 * --------------------------------------------------------------------
 * EcoBuildLab
 * Archivo: users.js
 * --------------------------------------------------------------------
 * Define las rutas relacionadas con los usuarios.
 * --------------------------------------------------------------------
 */

// ==============================
// Dependencias
// ==============================

const express = require("express");

const auth = require("../middlewares/auth");

const {
  signup,
  signin,
  getCurrentUser,
} = require("../controllers/userController");

const {
  validateSignup,
  validateSignin,
} = require("../validations/userValidation");

// ==============================
// Configuración del router
// ==============================

const router = express.Router();

// ==============================
// Rutas
// ==============================

/**
 * POST /
 * Registra un nuevo usuario.
 */
router.post("/signup", validateSignup, signup);

/**
 * POST /signin
 * Autentica un usuario y devuelve un JWT.
 */
router.post("/signin", validateSignin, signin);

/**
 * GET /users/me
 * Obtiene la información del usuario autenticado.
 */
router.get("/users/me", auth, getCurrentUser);

// ==============================
// Exportaciones
// ==============================

module.exports = router;
