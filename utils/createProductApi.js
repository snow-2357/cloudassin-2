const axios = require("axios");
// Example usage:
// const sampleData = {
//   productNumber: "501",
//   name: "Another test product",
//   costPrice: 60,
//   salesPrice: 110,
//   productGroup: {
//     productGroupNumber: 2,
//   },
// };

const toEconomic = (data) => {
  return data;
  //   const settings = {
  //     method: "post",
  //     url: "https://restapi.e-conomic.com/products",
  //     headers: {
  //       "x-appsecrettoken": "demo",
  //       "x-agreementgranttoken": "demo",
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   };

  //   return axios(settings)
  //     .then((response) => {
  //       return response.data;
  //     })
  //     .catch((error) => {
  //       throw error;
  //     });
};

module.exports = {
  toEconomic,
};
