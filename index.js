const express = require("express");
const bodyParser = require("body-parser");
const { toEconomic, multiply } = require("./utils/createProductApi");
const { findCustomer, createCustomer } = require("./utils/createUserApi");
const { createInvoice } = require("./utils/createOrderApi.");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/webhook-create-product", (req, res) => {
  try {
    const data = req.body; // Data sent by Spotify as JSON

    const formDataForEco = [];
    const name = data.title;
    const description = data.body_html;

    if (
      data.variants &&
      Array.isArray(data.variants) &&
      data.variants.length > 0
    ) {
      data.variants.forEach((variant) => {
        let salesPrice = variant.price;
        let productNumber = variant.sku;
        formDataForEco.push(name, description, salesPrice, productNumber);
        // multiple calles for different products
        toEconomic(sampleData)
          .then((response) => {
            console.log("product added");
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      });
    } else {
      console.log("No variants found in the data");
    }
    res.status(200).send("All Products added");
  } catch (error) {
    console.error(`Error: ${error}`);
    res.sendStatus(500);
  }
});

app.post("/webhook-create-invoice", async (req, res) => {
  try {
    const data = req.body;
    const customer = data.customer;
    const products = data.line_items; //its a arraay of object

    // find customer with api call
    const foundCustomer = await findCustomer(customer.email);

    if (foundCustomer) {
      console.log("user");
      // If customer is found, call the order invoice API
      // const orderInvoice = await createOrderInvoice(customer, products);
      // console.log("Order invoice created:", orderInvoice);
      // res.status(200).send("Order created");
    } else {
      const newCustomer = await createCustomer(customer);

      // const orderInvoice = await createOrderInvoice(newCustomer, products);
      // console.log("Order invoice created:", orderInvoice);

      res.status(200).send("Order created");
    }

    console.log(data, "order");

    res.status(200).send("order created");
  } catch (error) {
    console.error(`Error: ${error}`);
    res.sendStatus(500);
  }
});

app.get("/", async (req, res) => {
  // testing2
  // let sampleData = [
  //   {
  //     name: "My test product",
  //     productNumber: "511",
  //     salesPrice: 100,
  //     productGroup: {
  //       productGroupNumber: 1,
  //     },
  //   },
  // ];
  // toEconomic(sampleData)
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });

  // test3
  console.log("test3");
  const foundCustomer = await findCustomer("a");
  if (foundCustomer) {
    // Customer found, create the invoice
    // result = await createInvoice("a@a.com");
    console.log(foundCustomer);
  } else {
    console.log("error");
    // Customer not found, attempt to create a new customer
    // const newCustomer = await createCustomer("datas");

    // if (newCustomer) {
    //   // Customer created successfully, create the invoice
    //   result = await createInvoice("a@a.com");
    // } else {
    //   console.error("Customer creation failed");
    //   return res.status(400).send("Customer creation failed");
    // }
  }
});

app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});
