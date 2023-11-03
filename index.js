const express = require("express");
const bodyParser = require("body-parser");

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
  res.send("hi from local");
});

app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});
