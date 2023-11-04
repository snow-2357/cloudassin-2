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
      //
      createInvoice(customer, data.created_at.split("T")[0], foundCustomer)
        .then((response) => {
          res.status(200).send("invoice created");
          console.log(response);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      const newCustomer = await createCustomer(customer);
      if (newCustomer) {
        //
        createInvoice(customer, data.created_at.split("T")[0], newCustomer)
          .then((response) => {
            res.status(200).send("invoice created");
            console.log(response);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }
    console.log(data);
    // res.status(200).send(data, "order");
  } catch (error) {
    console.error(`Error: ${error}`);
    res.sendStatus(500);
  }
});

app.get("/", (req, res) => {
  // let sampleInvoiceData = {
  //   date: "2023-11-04",
  //   currency: "DKK",
  //   paymentTerms: {
  //     paymentTermsNumber: 2,
  //     daysOfCredit: 30,
  //     name: "Lobende maned 30 dage",
  //     paymentTermsType: "invoiceMonth",
  //   },
  //   customer: {
  //     customerNumber: 10,
  //   },
  //   recipient: {
  //     name: "Sima test",
  //     vatZone: {
  //       name: "Domestic",
  //       vatZoneNumber: 1,
  //       enabledForCustomer: true,
  //       enabledForSupplier: true,
  //     },
  //   },

  //   layout: {
  //     layoutNumber: 21,
  //   },

  //   lines: [
  //     {
  //       quantity: 1.0,
  //       product: {
  //         productNumber: "44282244628708",
  //       },
  //     },
  //     {
  //       quantity: 1.0,
  //       product: {
  //         productNumber: "44282239090916",
  //       },
  //     },
  //   ],
  // };
  // let sampleData = {
  //   name: "hi",
  //   email: "s@sima.com",
  //   currency: "DKK",
  //   customerGroup: {
  //     customerGroupNumber: 1,
  //     self: "https://restapi.e-conomic.com/customer-groups/1",
  //   },
  //   paymentTerms: {
  //     paymentTermsNumber: 2,
  //     self: "https://restapi.e-conomic.com/payment-terms/2",
  //   },
  //   vatZone: {
  //     vatZoneNumber: 1,
  //     self: "https://restapi.e-conomic.com/vat-zones/1",
  //   },
  // };
  // createCustomer(sampleData)
  //   .then((response) => {
  //     // res.send(response);
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });
  res.send("hi");
});

app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});
