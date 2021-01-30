import axios from 'axios';

const fetchBuyPrices = (currencies) =>
  new Promise((resolve) => {
    const resArray = [];
    currencies.map(async (currency, index) => {
      await axios
        .get(`https://api.ratesapi.io/api/latest?base=${currency}&symbols=TRY`)
        .then((res) => resArray.push({ data: res.data, id: index }))
        .catch((err) => {
          throw new Error(err);
        });
    });

    setTimeout(() => {
      resArray.sort((a, b) => a.id - b.id);
      resArray.length === currencies.length ? resolve(resArray) : fetchBuyPrices(currencies);
    }, 400);
  });
export default fetchBuyPrices;
