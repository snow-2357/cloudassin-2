const axios = require("axios");

async function findCustomer(customerEmail) {
  // Simulated logic to find a customer
  //   ?filter=name$eq:Joe$and:(email$eq:sim@gmail.com)
  const settings = {
    method: "get",
    url: `https://restapi.e-conomic.com/customers?filter=(email$like:${customerEmail})`,
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

async function createCustomer(customerDetails) {
  // Simulated logic to create a customer
  console.log("user created");
  return "user created";
  //   return createdCustomer;
}

module.exports = {
  findCustomer,
  createCustomer,
};
