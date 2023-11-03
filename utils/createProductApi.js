const axios = require("axios");

const appsecrettoken = "9lTlLXSQ7gBjHTfDWkoEBxUf88AqB51InmQb19N4YA81";

const agreementgranttoken = "khYn3qehBx7sf05ayXSnZxfSFivHx2eN04VyHzvcXcY1";

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
    method: "post",
    url: "https://restapi.e-conomic.com/products",
    headers: {
      "x-appsecrettoken": appsecrettoken,
      "x-agreementgranttoken": agreementgranttoken,
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
