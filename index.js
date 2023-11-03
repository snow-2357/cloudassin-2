const express = require("express");
const bodyParser = require("body-parser");
const { toEconomic, multiply } = require("./utils/createProductApi");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
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

app.get("/", (req, res) => {
  // testing
  let sampleData = [
    {
      name: "My test product",
      productNumber: "511",
      salesPrice: 100,
      productGroup: {
        productGroupNumber: 1,
      },
    },
  ];
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
