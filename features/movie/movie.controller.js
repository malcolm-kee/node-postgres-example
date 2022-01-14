const express = require('express');

const movieService = require('./movie.service');

const movieController = express.Router();

movieController.get('/', (_, res, next) =>
  movieService
    .getMovies()
    .then((movies) => res.json(movies))
    .catch((err) => next(err))
);

movieController.get('/:id', (req, res, next) =>
  movieService
    .getMovie(req.params.id)
    .then((movie) => {
      if (!movie) {
        return res.status(404).json({
          message: 'Not found',
        });
      }
      return res.status(200).json(movie);
    })
    .catch((err) => next(err))
);

module.exports = movieController;
