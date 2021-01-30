import React from 'react';
import PropTypes from 'prop-types';

import './c-title.scss';

const Title = ({ title }) => (
  <div className="c-title">
    <h1 className="c-title__title">{title}</h1>
  </div>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
