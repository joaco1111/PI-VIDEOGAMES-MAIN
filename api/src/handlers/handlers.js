const { Videogame, Genre } = require('./models'); // tengo que importar los modelos de la base de datos

// Rutas
const getVideogames = async (req, res) => {
  try {
        const localVideogames = await Videogame.findAll();
    
        const apiResponse = await axios.get('https://api.rawg.io/api/games', {
          params: {
            api_key: '0b7fb8c0aba047d3be896c3c0614c0c7', },
        });

        const apiVideogames = apiResponse.data.results;
        const combinedVideogames = [...localVideogames, ...apiVideogames];
        res.json(combinedVideogames);

      } catch (error) {
        console.error('Error al obtener videojuegos:', error);
        res.status(500).json({ message: 'Error en el servidor' });
      }
};
  

const axios = require('axios'); // Importa axios para hacer solicitudes HTTP a la API externa.

const getVideogameById = async (req, res) => {
  try {
    const { idVideogame } = req.params;

    // (obtener el videojuego de la base de datos con Sequelize):
    const localVideogame = await Videogame.findByPk(idVideogame);
    if (localVideogame) {
      res.json(localVideogame);
    } else {
      const apiResponse = await axios.get(`https://api.rawg.io/api/games/${idVideogame}`, {
        params: {
          api_key: '0b7fb8c0aba047d3be896c3c0614c0c7', },
      });
      const apiVideogame = apiResponse.data;
      res.json(apiVideogame);
    }
  } catch (error) {
    console.error('Error al obtener el detalle del videojuego:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};



const createVideogame = async (req, res) => {
  try {
    const { name, image, description, platforms, releaseDate, rating, genres } = req.body;
    const newVideogame = await Videogame.create({
      name,
      image,
      description,
      platforms,
      releaseDate,
      rating,
    });

    if (genres && genres.length > 0) {
      await newVideogame.setGenres(genres);
    }

    res.status(201).json(newVideogame); // Devuelve el videojuego creado.
  } catch (error) {
    console.error('Error al crear un nuevo videojuego:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};



// Ruta géneros
const axios = require('axios');

const getGenres = async (req, res) => {
  try {
    const localGenres = await Genre.findAll();
    if (localGenres.length > 0) {
      res.json(localGenres);

    } else {

      const apiResponse = await axios.get('https://api.rawg.io/api/genres', {
        params: {
          api_key: '0b7fb8c0aba047d3be896c3c0614c0c7', },
      });

      const apiGenres = apiResponse.data.results;
      res.json(apiGenres);

    }
  } catch (error) {
    console.error('Error al obtener géneros:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = {
  getVideogames,
  getVideogameById,
  createVideogame,
  getGenres,
};
