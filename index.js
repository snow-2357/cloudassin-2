const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  try {
    const data = req.body; // Data sent by Spotify as JSON

    console.log("notify", data);

    // res.sendStatus(200);
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
