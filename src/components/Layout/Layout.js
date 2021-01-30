import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import '../../styles/main.scss';
import './o-main.scss';

const Layout = ({ children, className }) => (
  <main className={cx('o-main', className)}>{children}</main>
);

export default Layout;

Layout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  className: '',
};
