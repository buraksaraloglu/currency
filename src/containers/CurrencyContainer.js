import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Currency from '../components/Currency';
import { ButtonMain, ButtonSecondary } from '../components/Button';
import Converter from '../components/Converter';

const CurrencyContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currencies] = useState(['USD', 'EUR', 'GBP', 'JPY', 'DKK', 'NOK']);
  const [buyPrices, setBuyPrices] = useState([]);
  const [sellPrices, setSellPrices] = useState({});

  useEffect(() => {
    if (isLoading) {
      const buyPrice = new Promise((resolve, reject) => {
        const resArray = [];
        try {
          currencies.map(async (currency, index) => {
            await axios
              .get(`https://api.ratesapi.io/api/latest?base=${currency}&symbols=TRY`)
              .then((res) => {
                resArray.push({ data: res.data, id: index });
                if (currencies.length - 1 === index) {
                  resolve(resArray);
                }
              })
              .catch((err) => {
                throw new Error(err);
              });
          });
        } catch (error) {
          reject(error);
        }
      });

      const sellPrice = Promise.resolve(
        axios
          .get(`https://api.ratesapi.io/api/latest?base=TRY&symbols=USD,EUR,GBP,JPY,DKK,NOK`)
          .then((res) => res.data)
          .catch((err) => {
            throw new Error(err);
          }),
      );

      Promise.all([buyPrice, sellPrice])
        .then((values) => {
          setBuyPrices(values[0]);
          setSellPrices(values[1]);
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
