import axios from 'axios';

// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const getUser = async (token) => {
  const res = await axios.get(`/api/user`, {
    headers: { Authorization: token ? 'Bearer ' + token : undefined },
  });
  return res.data;
};

export const getCarouselItems = async () => {
  const res = await axios.get('/api/carousel');
  return res.data;
};

export const getMovies = async () => {
  const res = await axios.get('/api/movies');
  return res.data;
};

export const getMovieList = async (type) => {
  const res = await axios.get(`/api/movies?type=${type}`);
  return res.data;
};

export const getMovieDetail = async (movieCode) => {
  const res = await axios.get(`/api/movies/${movieCode}`);
  return res.data;
};

export const getMovieReview = async (
  token,
  movieCode,
  page = 1,
  count = 10,
  sortType = 'recent'
) => {
  const res = await axios.get(
    `/api/review?movieCode=${movieCode}&page=${page}&count=${count}&sortType=${sortType}`,
    {
      headers: { Authorization: token ? 'Bearer ' + token : undefined },
    }
  );
  return res.data;
};

export const addMovieReivew = async (
  token,
  movieCode,
  reviewText,
  evaluation
) => {
  const res = await axios.post(
    `/api/review`,
    {
      movieCode,
      reviewText,
      evaluation,
    },
    {
      headers: { Authorization: 'Bearer ' + token },
    }
  );
  return res.data;
};

export const deleteMovieReview = async (token, movieCode, reviewId) => {
  const res = await axios.delete(`/api/review/${reviewId}`, {
    headers: { Authorization: 'Bearer ' + token },
    data: {
      movieCode,
    },
  });
  return res.data;
};

export const editMovieReivew = async (
  token,
  movieCode,
  reviewId,
  reviewText,
  evaluation,
  recommend
) => {
  const res = await axios.put(
    `/api/review/${reviewId}`,
    {
      movieCode,
      reviewText,
      evaluation,
      recommend,
    },
    {
      headers: { Authorization: 'Bearer ' + token },
    }
  );
  return res.data;
};

export const getTicketingInfo = async () => {
  const res = await axios.get('/api/ticketing');
  return res.data;
};

export const getPlaySequence = async (
  playDate,
  divisionCode,
  detailDivisionCode,
  cinemaId,
  movieCode
) => {
  const res = await axios.get(
    `/api/ticketing/playSequence?playDate=${playDate}&divisionCode=${divisionCode}&detailDivisionCode=${detailDivisionCode}&cinemaId=${cinemaId}${
      movieCode ? `&movieCode=${movieCode}` : ''
    }`
  );
  return res.data;
};

export const getSeats = async (
  cinemaId,
  screenId,
  playDate,
  playSequence,
  screenDivisionCode
) => {
  const res = await axios.get(
    `/api/ticketing/seats?playDate=${playDate}&cinemaId=${cinemaId}&screenDivisionCode=${screenDivisionCode}&screenId=${screenId}&playSequence=${playSequence}`
  );
  return res.data;
};

export const getUserTicketing = async (token) => {
  const res = await axios.get(`/api/ticketing/userTicketing`, {
    headers: { Authorization: 'Bearer ' + token },
  });
  return res.data;
};

export const addUserTicketing = async (
  token,
  movieCode,
  movieName,
  posterUrl,
  viewGradeCode,
  divisionCode,
  detailDivisionCode,
  cinemaId,
  cinemaName,
  screenId,
  screenName,
  screenDivisionCode,
  screenDivisionName,
  playSequence,
  playDate,
  playDay,
  startTime,
  endTime,
  seatNoList,
  price
) => {
  const res = await axios.post(
    `/api/ticketing/userTicketing`,
    {
      movieCode,
      movieName,
      posterUrl,
      viewGradeCode,
      divisionCode,
      detailDivisionCode,
      cinemaId,
      cinemaName,
      screenId,
      screenName,
      screenDivisionCode,
      screenDivisionName,
      playSequence,
      playDate,
      playDay,
      startTime,
      endTime,
      seatNoList,
      price,
    },
    {
      headers: { Authorization: 'Bearer ' + token },
    }
  );
  return res.data;
};

export const deleteUserTicketing = async (token, ticketingId) => {
  const res = await axios.delete(
    `/api/ticketing/userTicketing/${ticketingId}`,
    {
      headers: { Authorization: 'Bearer ' + token },
    }
  );
  return res.data;
};

export const login = async (email, password) => {
  try {
    const res = await axios.post('/api/auth/login', {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw error.response && error.response.data
      ? error.response.data.message
      : error.message;
  }
};

export const signin = async (name, email, password, confirmPassword) => {
  try {
    const res = await axios.post('/api/auth/signin', {
      name,
      email,
      password,
      confirmPassword,
    });
    return res.data;
  } catch (error) {
    throw error.response && error.response.data
      ? error.response.data.message
      : error.message;
  }
};

export const logout = async (token) => {
  const res = await axios.get(`/api/auth/logout`, {
    headers: { Authorization: 'Bearer ' + token },
  });
  return res.data;
};
