import React, { useState, useEffect } from 'react';

import Currency from '../components/Currency';
import { ButtonMain, ButtonSecondary } from '../components/Button';
import Converter from '../components/Converter';

import fetchBuyPrices from '../hooks/fetchBuyPrices';
import fetchSellPrices from '../hooks/fetchSellPrices';

const CurrencyContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currencies] = useState(['USD', 'EUR', 'GBP', 'JPY', 'DKK', 'NOK']);
  const [buyPrices, setBuyPrices] = useState([]);
  const [sellPrices, setSellPrices] = useState({});

  useEffect(() => {
    if (isLoading) {
      Promise.all([fetchBuyPrices(currencies), fetchSellPrices()])
        .then((value) => {
          setBuyPrices(value[0]);
          setSellPrices(value[1]);
          setIsLoading(false);
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  }, [currencies, isLoading]);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && buyPrices && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <ul className="c-currency">
              {buyPrices.map((currency) => (
                <Currency
                  key={currency.id}
                  fiat={currency.data.base}
                  buy={currency.data.rates.TRY.toString().substring(0, 6)}
                  sell={(1 / sellPrices.rates[currency.data.base]).toString().substring(0, 6)}
                />
              ))}
            </ul>
            <Converter currencies={currencies} prices={buyPrices} />
          </div>
          <div className="c-button-container">
            <ButtonMain text="Detaylı Bilgi" />
            <ButtonSecondary text="Tüm Piyasalar" />
          </div>
        </>
      )}
    </>
  );
};

export default CurrencyContainer;
