import React from 'react';

import Layout from '../components/Layout';
import MovieListContainer from '../containers/MovieListContainer';

const MovieListPage = ({ match }) => {
  const { listType } = match.params;
  return (
    <Layout theme="light">
      <MovieListContainer listType={listType} />
    </Layout>
  );
};

export default MovieListPage;
