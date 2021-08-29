const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Todo  API",
      description: "Basic API for TODO list",
      contact: {
        name: "Kiryl",
      },
      servers: ["http://localhost:3000", "http://localhost:8080"],
    },
  },
  apis: ["*.js", "./routes/*.js"],
};

module.exports = swaggerOptions;
