import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactCountryFlag from 'react-country-flag';

import './c-currency.scss';

const Currency = ({ fiat, buy, sell }) => {
  const [fiatLongName, setFiatLongName] = useState(fiat || '');
  const [flagCode, setFlagCode] = useState('');

  useEffect(() => {
    switch (fiat) {
      case 'USD':
        setFiatLongName('Amerikan Doları');
        setFlagCode('US');
        break;
      case 'EUR':
        setFiatLongName('Avrupa Birliği Avrosu');
        setFlagCode('EU');
        break;
      case 'GBP':
        setFiatLongName('İngiliz Sterlini');
        setFlagCode('GB');
        break;
      case 'JPY':
        setFiatLongName('Japon Yeni');
        setFlagCode('JP');
        break;
      case 'DKK':
        setFiatLongName('Danimarka Kronu');
        setFlagCode('DK');
        break;
      case 'NOK':
        setFiatLongName('Norveç Kronu');
        setFlagCode('NO');
        break;

      default:
        break;
    }
  }, [fiat]);

  return (
    fiat && (
      <li className="c-currency-item">
        <div className="c-currency-item__left">
          <div className="c-currency-item__left__flag">
            <ReactCountryFlag countryCode={flagCode} svg title={flagCode} />
          </div>
          <div className="c-currency-item__left__title-container">
            <h2 className="c-currency-item__left__title-container__title">{fiat}</h2>
            <p className="c-currency-item__left__title-container__long-name">{fiatLongName}</p>
          </div>
        </div>
        <div className="c-currency-item__price-container">
          <div className="c-currency-item__price-container__price-item buy">
            <h4 className="c-currency-item__price-container__price-item__price-cat">ALIŞ</h4>
            <h3 className="c-currency-item__price-container__price-item__price">{buy}</h3>
          </div>
          <div className="c-currency-item__price-container__price-item sell">
            <h4 className="c-currency-item__price-container__price-item__price-cat">SATIŞ</h4>
            <h3 className="c-currency-item__price-container__price-item__price">{sell}</h3>
          </div>
        </div>
      </li>
    )
  );
};

Currency.propTypes = {
  fiat: PropTypes.string.isRequired,
  buy: PropTypes.string.isRequired,
  sell: PropTypes.string.isRequired,
};

export default Currency;
