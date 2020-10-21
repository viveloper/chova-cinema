import React from 'react';
import Layout from '../components/Layout';
import MoviesContainer from '../containers/MoviesContainer';

const MoviesPage = () => {
  return (
    <Layout theme="light">
      <MoviesContainer />
    </Layout>
  );
};

export default MoviesPage;
