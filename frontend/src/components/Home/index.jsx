import React from 'react';

import Carousel from '../Carousel';
import SectionMovies from './SectionMovies';
import MovieCardList from '../MovieCardList';

const Home = ({ movies, carouselItems }) => {
  return (
    <>
      <Carousel theme="dark" height={774} items={carouselItems} />
      <SectionMovies>
        <MovieCardList theme="dark" movies={movies} activeNum={5} />
      </SectionMovies>
    </>
  );
};

export default React.memo(Home);
