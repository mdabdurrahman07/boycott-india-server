require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require("mongoose");
const port = process.env.PORT
const cors = require("cors");
const allproduct = require('./src/model/allproduct');


// middlewares
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// mongoose connection
mongoose
  .connect(
    `${process.env.MongoDBConnection}`,
    { dbName: "BoycottIndianProduct"}
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("mongodb connection error", err));

app.get('/', (req, res) => {
  res.send('Boycott Indian Products server')
})

// all post routes

app.post('/api/bcip/v1/allproducts/post', async (req , res) => {
  try {
    const data = req.body
    const newProduct = allproduct(data)
  const result = await newProduct.save()
  res.send(result)
  } catch (error) {
    res.status(500).send(error.message);
  }
})

// alll get routes

app.get('/api/bcip/v1/allproducts/get', async (req , res) => {
    const result = await allproduct.find()
    res.send(result)
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})