import React from 'react';
import PropTypes from 'prop-types';

import { BsArrowRight } from 'react-icons/bs';

import './c-button.scss';

export const ButtonMain = ({ text }) => (
  <button className="c-button c-button__main" type="button">
    {text}
  </button>
);

export const ButtonSecondary = ({ text }) => (
  <button className="c-button c-button__secondary" type="button">
    {text}
    <BsArrowRight />
  </button>
);

ButtonMain.propTypes = {
  text: PropTypes.string.isRequired,
};

ButtonSecondary.propTypes = {
  text: PropTypes.string.isRequired,
};
