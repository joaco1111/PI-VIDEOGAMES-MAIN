const { Router } = require("express");
const videogamesRoute = require("./videogames.js")
const genresRoute = require('./genres.js')
const videogameRoute = require('./videogame.js')
const express = require('express');
const pool = require('../db.js');
//const filtradosByRoute = require('./filtrados.js')

// Ruta para obtener datos desde la base de datos
router.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM tu_tabla');
    client.release();

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener datos de la base de datos' });
  }
});

const router = Router(); //si lo cololco en la parte superior sale error

// Configurar los routers
router.use('/videogames', videogamesRoute);
router.use('/genres', genresRoute)
router.use('/videogame', videogameRoute)
//router.use('/filtrados', filtradosByRoute)

module.exports = router;