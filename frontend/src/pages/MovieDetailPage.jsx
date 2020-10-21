import React from 'react';

import Layout from '../components/Layout';
import MovieDetailContainer from '../containers/MovieDetailContainer';

const MovieDetailPage = ({ match }) => {
  const { movieCode } = match.params;
  return (
    <Layout theme="light">
      <MovieDetailContainer movieCode={movieCode} />
    </Layout>
  );
};

export default MovieDetailPage;
