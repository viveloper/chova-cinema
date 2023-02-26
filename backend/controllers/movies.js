const fs = require('fs');
const path = require('path');
const axios = require('axios');

// @desc    Get movies
// @route   GET /api/movies
// @access  Public
exports.getMovies = async (req, res, next) => {
  let result = [];

  if (req.query.type === 'current') {
    const { data: movies } = await axios.get('/data/home/movies.json');
    result = movies.Movies.Items[0].Items.filter(
      (item) => item.MoviePlayYN === 'Y'
    );
  } else if (req.query.type === 'pre') {
    const { data: movies } = await axios.get('/data/home/movies.json');
    result = movies.Movies.Items[0].Items.filter(
      (item) => item.MoviePlayYN === 'N'
    );
  } else if (req.query.type === 'arte') {
    const { data: movies } = await axios.get('/data/movies/arteMovieList.json');
    result = movies.Movies.Items;
  } else if (req.query.type === 'opera') {
    const { data: movies } = await axios.get(
      '/data/movies/operaMovieList.json'
    );
    result = movies.Movies.Items;
  } else {
    const { data: movies } = await axios.get('/data/home/movies.json');
    result = movies.Movies.Items[0].Items;
  }

  res.status(200).json(
    result.map((movie) => ({
      ...movie,
      PosterURL: `${process.env.BASE_URL}${movie.PosterURL}`,
    }))
  );
};

// @desc    Get movie detail
// @route   GET /api/movies/:movieCode
// @access  Public
exports.getMovieDetail = async (req, res, next) => {
  const movieCode = req.params.movieCode;

  const { data: movieDetail } = await axios.get(
    `/data/movieDetail/${movieCode}.json`
  );

  res.status(200).json(movieDetail);
};
