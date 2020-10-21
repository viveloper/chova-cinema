import React from 'react';

import Layout from '../components/Layout';
import TicketingContainer from '../containers/TicketingContainer';

const TicketingPage = ({ history }) => {
  return (
    <Layout theme="light">
      <TicketingContainer history={history} />
    </Layout>
  );
};

export default TicketingPage;
