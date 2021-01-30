import axios from 'axios';

const fetchSellPrices = () =>
  axios
    .get(`https://api.ratesapi.io/api/latest?base=TRY&symbols=USD,EUR,GBP,JPY,DKK,NOK`)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });

export default fetchSellPrices;
