import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Movies from '../components/Movies';
import { getCarouselItems } from '../modules/carouselItems';
import {
  getCurrentMovieList,
  getPreMovieList,
  getArteMovieList,
  getOperaMovieList,
} from '../modules/movies';

const MoviesContainer = () => {
  const {
    loading: carouselItemsLoading,
    data: carouselItems,
    error: carouselItemsError,
  } = useSelector((state) => state.carouselItems);

  const {
    loading: currentMovieListLoading,
    data: currentMovieList,
    error: currentMovieListError,
  } = useSelector((state) => state.movies.currentMovieList);

  const {
    loading: preMovieListLoading,
    data: preMovieList,
    error: preMovieListError,
  } = useSelector((state) => state.movies.preMovieList);

  const {
    loading: arteMovieListLoading,
    data: arteMovieList,
    error: arteMovieListError,
  } = useSelector((state) => state.movies.arteMovieList);

  const {
    loading: operaMovieListLoading,
    data: operaMovieList,
    error: operaMovieListError,
  } = useSelector((state) => state.movies.operaMovieList);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!carouselItems) dispatch(getCarouselItems());
    if (!currentMovieList) dispatch(getCurrentMovieList());
    if (!preMovieList) dispatch(getPreMovieList());
    if (!arteMovieList) dispatch(getArteMovieList());
    if (!operaMovieList) dispatch(getOperaMovieList());
  }, [
    dispatch,
    carouselItems,
    currentMovieList,
    preMovieList,
    arteMovieList,
    operaMovieList,
  ]);

  const filteredCarouselItems = useMemo(
    () =>
      carouselItems
        ? carouselItems.filter((item) => item.use === 'movie')
        : null,
    [carouselItems]
  );

  const top5CurrentMovieList = useMemo(
    () =>
      currentMovieList
        ? currentMovieList
            .filter((movie) => parseInt(movie.DDay) === 0)
            .slice(0, 5)
        : null,
    [currentMovieList]
  );

  const top5PreMovieList = useMemo(
    () =>
      preMovieList
        ? preMovieList.filter((movie) => parseInt(movie.DDay) > 0).slice(0, 5)
        : null,
    [preMovieList]
  );

  if (
    carouselItemsLoading ||
    currentMovieListLoading ||
    preMovieListLoading ||
    arteMovieListLoading ||
    operaMovieListLoading
  )
    return <div>loading...</div>;
  if (
    carouselItemsError ||
    currentMovieListError ||
    preMovieListError ||
    arteMovieListError ||
    operaMovieListError
  )
    return <div>error!</div>;
  if (
    !carouselItems ||
    !currentMovieList ||
    !preMovieList ||
    !arteMovieList ||
    !operaMovieList
  )
    return null;

  return (
    <Movies
      carouselItems={filteredCarouselItems}
      top5CurrentMovies={top5CurrentMovieList}
      top5PreMovies={top5PreMovieList}
      arteMovies={arteMovieList}
      operaMovies={operaMovieList}
    />
  );
};

export default MoviesContainer;
