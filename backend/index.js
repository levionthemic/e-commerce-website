const express = require("express");
require("dotenv").config();

const database = require("./config/database");

const adminRoutes = require("./api/v1/routes/admin/index.route");
const clientRoutes = require("./api/v1/routes/client/index.route");

const app = express();
const port = process.env.PORT;

// Database
database.connect();

// Routes
adminRoutes(app);
clientRoutes(app);

// Listen
app.listen(port, () => {
  console.log(`App listen on port ${port}`);
})