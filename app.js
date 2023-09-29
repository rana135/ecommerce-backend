const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'))
app.disable('x-powered-by')

// Route
const productRoute = require('./routes/product.route')
// const supplierRoute = require('./routes/supplier.route')
const storeRoute = require('./routes/store.route')
const authRoute = require('./routes/auth.route')


app.use('/api/v1/products', productRoute)
// app.use('/api/v1/supplier', supplierRoute)
app.use('/api/v1/store', storeRoute)
app.use('/api/v1/', authRoute)


app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
