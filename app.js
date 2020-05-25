const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const api = require("./api");
const app = express();
const bodyParser = require("body-parser");
app.use(helmet());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json({
    message: "This Api doesnt work anymore the FBI reached it",
  });
});

app.use("/", api);

module.exports = app;
