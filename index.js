const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const routes = require("./routes/index");
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const swaggerJsDocs = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./docs/basicInformation");
const swaggerDocs = swaggerJsDocs(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

async function start() {
  try {
    await mongoose.connect("mongodb+srv://User:User@cluster0.ofryj.mongodb.net/Todo", {
      useNewUrlParser: true,
      useFindAndModify: false,
    }).then(console.log('connected to DB!'));
    app.listen(PORT, () => {
      console.log(`Server started PORT ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}
app.use(bodyParser.json());
app.use("/api", routes);

start();
