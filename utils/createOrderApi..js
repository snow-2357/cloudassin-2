const axios = require("axios");

// let sampleData = {
//   currency: "DKK",
//   customer: {
//     customerNumber: 1,
//   },
//   data: "2023-11-04",
//   layout: {
//     layoutNumber: 21,
//     self: "https://restapi.e-conomic.com/layouts/21",
//   },
//   paymentTermsNumber: 2,
//   recipient: {
//     name: "Sima test",
//     vatZone: {
//       vatZoneNumber: 1,
//       self: "https://restapi.e-conomic.com/vat-zones/1",
//     },
//     nemHandelType: "corporateIdentificationNumber",
//   },
// };

async function createInvoice(orderData) {
  const settings = {
    method: "post",
    url: `https://restapi.e-conomic.com/invoices/drafts`,
    headers: {
      "x-appsecrettoken": process.env.APPSECRETTOKEN,
      "x-agreementgranttoken": process.env.AGREEMENTGRANTTOKEN,
      "Content-Type": "application/json",
    },
    data: orderData,
  };

  return axios(settings)
    .then((response) => {
      console.log(response.data, "invoice");

      //   return response.data.collection;
      return response.data;
    })
    .catch((error) => {
      throw error;
      console.log("api error");
    });
}

module.exports = { createInvoice };
