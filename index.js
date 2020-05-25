const app = require("./app");
const port = process.env.PORT || 3000;
const mongo = require("./mongo/db");
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
mongo.connect();
