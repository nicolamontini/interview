const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Device Service API",
      version: "1.0.0",
      description: "API for managing devices and file uploads",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // where to read annotations
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;