const axios = require("axios");

async function findCustomer(customerEmail) {
  //   ?filter=name$eq:Joe$and:(email$eq:sim@gmail.com)
  const settings = {
    method: "get",
    url: `https://restapi.e-conomic.com/customers?filter=(email$eq:${customerEmail})`,
    headers: {
      "x-appsecrettoken": process.env.APPSECRETTOKEN,
      "x-agreementgranttoken": process.env.AGREEMENTGRANTTOKEN,
      "Content-Type": "application/json",
    },
  };

  return axios(settings)
    .then((response) => {
      if (
        // if collection have customers
        Array.isArray(response.data.collection) &&
        response.data.collection.length > 0
      ) {
        return true;
      }
      return false;

      //   return response.data.collection;
    })
    .catch((error) => {
      throw error;
      console.log("api error");
    });
}

let sampleData = {
  name: "My test product",
  email: "s@s.com",
  currency: "DKK",
  customerGroup: {
    customerGroupNumber: 1,
    self: "https://restapi.e-conomic.com/customer-groups/1",
  },
  paymentTerms: {
    paymentTermsNumber: 2,
    self: "https://restapi.e-conomic.com/payment-terms/2",
  },
  vatZone: {
    vatZoneNumber: 1,
    self: "https://restapi.e-conomic.com/vat-zones/1",
  },
};

async function createCustomer(customerDetails) {
  const settings = {
    method: "post",
    url: `https://restapi.e-conomic.com/customers`,
    headers: {
      "x-appsecrettoken": process.env.APPSECRETTOKEN,
      "x-agreementgranttoken": process.env.AGREEMENTGRANTTOKEN,
      "Content-Type": "application/json",
    },
    data: sampleData,
  };

  return axios(settings)
    .then((response) => {
      console.log("custome added");

      //   return response.data.collection;
    })
    .catch((error) => {
      throw error;
      console.log("api error");
    });
}

module.exports = {
  findCustomer,
  createCustomer,
};
