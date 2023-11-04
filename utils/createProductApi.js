const axios = require("axios");

// let sampleData = {
//   name: "My test product",
//   productNumber: "504", required
//   salesPrice: 100,
//   productGroup: {   required
//     productGroupNumber: 1,
//   },
// };

const toEconomic = (data) => {
  const settings = {
    method: "POST",
    url: "https://restapi.e-conomic.com/products",
    headers: {
      "x-appsecrettoken": process.env.APPSECRETTOKEN,
      "x-agreementgranttoken": process.env.AGREEMENTGRANTTOKEN,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(settings)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = {
  toEconomic,
};
