async function findCustomer(customer) {
  // Simulated logic to find a customer
  return false;
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
