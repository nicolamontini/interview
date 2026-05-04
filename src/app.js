const express = require("express");
const swaggerUi = require("swagger-ui-express");

const deviceRoutes = require("./routes/devices");
const swaggerSpec = require("./swagger");

const app = express();
app.use(express.json());

app.use("/devices", deviceRoutes);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
  console.log("Server running on port 3000");
  console.log("Swagger available at http://localhost:3000/api-docs");
});