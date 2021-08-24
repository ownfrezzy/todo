const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const routes = require("./routes/index");
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const swaggerJsDocs = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "My first API",
      description: "My API information",
      contact: {
        name: "Kiryl",
      },
      servers: ["http://localhost:3000", "http://localhost:8080"],
    },
  },
  apis: ["*.js", "./routes/*.js"],
};
const swaggerDocs = swaggerJsDocs(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

async function start() {
  try {
    await mongoose.connect("mongodb://localhost:27017/todo", {
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    app.listen(PORT, () => {
      console.log(`Server started PORT ${PORT}`);
    });
    
  } catch (e) {
    console.log(e);
  }
}
app.use(bodyParser.json());
app.use('/api', routes)


start()
