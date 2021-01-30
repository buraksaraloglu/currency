import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NumericLabel from 'react-pretty-numbers';

import { BsArrowUpDown } from 'react-icons/bs';

import './c-converter.scss';

const Converter = ({ currencies, prices }) => {
  const [convertInput, setConvertInput] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0] || 'USD');
  const [conversionResult, setConversionResult] = useState(0);

  const regexp = new RegExp(`^-?[0-9]*$`);

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    if (regexp.test(e.target.value) && e.target.value.length < 14) {
      setConvertInput(e.target.value);
    }
  };

  useEffect(() => {
    if (prices) {
      const targetCurrency = prices.filter((target) => target.data.base === selectedCurrency);
      setConversionResult(convertInput * targetCurrency[0].data.rates.TRY);
    }
  }, [convertInput, prices, selectedCurrency]);

  const params = {
    cssClass: ['c-converter__calculated-price-container__price'],
  };

  return (
    <div className="c-converter">
      <h4 className="c-converter__title">Döviz Çevir</h4>
      <div className="c-converter__input-container">
        <input
          placeholder="Tutar girin"
          type="number"
          value={convertInput || ''}
          onChange={handleInputChange}
          className="c-converter__input-container__input"
        />
        <select
          className="c-converter__input-container__select"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
        >
          {currencies &&
            currencies.map((currency, index) => (
              <option key={index} value={currency}>
                {currency}
              </option>
            ))}
        </select>
      </div>
      <div className="c-converter__icon">
        <BsArrowUpDown />
      </div>

      <div className="c-converter__calculated-price-container">
        <NumericLabel params={params}>{conversionResult}</NumericLabel>
        <p className="c-converter__calculated-price-container__currency">TL</p>
      </div>
    </div>
  );
};

Converter.propTypes = {
  currencies: PropTypes.array.isRequired,
  prices: PropTypes.array.isRequired,
};

export default Converter;
