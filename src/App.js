import React from 'react';

import Layout from './components/Layout';
import Title from './components/Title';

import CurrencyContainer from './containers/CurrencyContainer';

const App = () => (
  <Layout>
    <Title title="Piyasalar" />
    <CurrencyContainer />
  </Layout>
);

export default App;
