const express = require("express");
const bodyParser = require("body-parser");
const { toEconomic } = require("./utils/createProductApi");
const { findCustomer, createCustomer } = require("./utils/createUserApi");
const { createInvoice } = require("./utils/createOrderApi.");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/webhook-create-product", (req, res) => {
  try {
    const data = req.body; // Data sent by Spotify as JSON

    const name = data.title;
    const description = data.body_html;

    if (
      data.variants &&
      Array.isArray(data.variants) &&
      data.variants.length > 0
    ) {
      data.variants.forEach((variant) => {
        let salesPrice = Number(variant.price);
        //sku is always ""
        let productNumber = variant.id.toString();
        let formDataForEco = {
          name,
          description,
          salesPrice,
          productNumber,
          productGroup: {
            productGroupNumber: 1,
          },
        };
        console.log(formDataForEco);
        // multiple calles for different products
        toEconomic(formDataForEco)
          .then((response) => {
            console.log("product added");
          })
          .catch((error) => {
            console.error("error");
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
    const foundCustomer = await findCustomer(customer?.email);

    if (foundCustomer) {
      console.log("user");
      //
      res.status(200).send("invoice created");
    } else {
      const newCustomer = await createCustomer(customer);
      if (newCustomer) {
        //
        res.status(200).send("invoice created");
      }
    }

    console.log(data, "order");

    res.status(200).send("order created");
  } catch (error) {
    console.error(`Error: ${error}`);
    res.sendStatus(500);
  }
});

// app.get("/", async (req, res) => {
//   // testing2
//   // let sampleData = [
//   //   {
//   //     name: "My test product",
//   //     productNumber: "511",
//   //     salesPrice: 100,
//   //     productGroup: {
//   //       productGroupNumber: 1,
//   //     },
//   //   },
//   // ];
//   // toEconomic(sampleData)
//   //   .then((response) => {
//   //     console.log(response);
//   //   })
//   //   .catch((error) => {
//   //     console.error("Error:", error);
//   //   });

//   // test3
//   console.log("test3");
//   // const createuser = await createInvoice("simatest@gmail.com");
//   if (createuser) {
//     // Customer found, create the invoice
//     // result = await createInvoice("a@a.com");
//     console.log(createuser);
//   } else {
//     console.log("error1");
//     // Customer not found, attempt to create a new customer
//     // const newCustomer = await createCustomer("datas");

//     // if (newCustomer) {
//     //   // Customer created successfully, create the invoice
//     //   result = await createInvoice("a@a.com");
//     // } else {
//     //   console.error("Customer creation failed");
//     //   return res.status(400).send("Customer creation failed");
//     // }
//   }
// });

app.get("/", (req, res) => {
  let sampleData = {
    name: "My test product",
    description: "aa",
    productNumber: 64282194723044,
    salesPrice: 100,
    productGroup: {
      productGroupNumber: 1,
    },
  };
  toEconomic(sampleData)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});
