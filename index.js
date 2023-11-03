const express = require("express");
const bodyParser = require("body-parser");
const { toEconomic, multiply } = require("./utils/createProductApi");

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
        // toEconomic(sampleData)
        //   .then((response) => {
        //     console.log(response);
        //   })
        //   .catch((error) => {
        //     console.error("Error:", error);
        //   });
      });
    } else {
      console.log("No variants found in the data");
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    res.sendStatus(500);
  }
});

app.get("/", (req, res) => {
  // ?test
  // const data = toEconomic("sima");
  // res.json(data);
});

app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});
