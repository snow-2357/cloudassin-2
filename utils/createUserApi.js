const axios = require("axios");

async function findCustomer(customer) {
  // Simulated logic to find a customer
  //   ?filter=name$eq:Joe$and:(email$eq:sim@gmail.com)
  const settings = {
    method: "get",
    url: "https://restapi.e-conomic.com/customers?filter=(email$like:simatest1@gmail.com)",
    headers: {
      "x-appsecrettoken": process.env.APPSECRETTOKEN,
      "x-agreementgranttoken": process.env.AGREEMENTGRANTTOKEN,
      "Content-Type": "application/json",
    },
    params: {
      email: "",
    },
  };

  return axios(settings)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
  //   return customerExists ? customer : null;
}

async function createCustomer(customer) {
  // Simulated logic to create a customer
  console.log("user created");
  return "user created";
  //   return createdCustomer;
}

module.exports = {
  findCustomer,
  createCustomer,
};
