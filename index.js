require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT;
const cors = require("cors");
const allproduct = require("./src/model/allproduct");

// middlewares
const allowedOrigins = [
  'http://localhost:5173',
  'https://dashboard.brainnect.com',
  'https://brainnect.com',
  'https://brainnect.com/'
];

app.use(cors({
  origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  }
}));
app.use(express.json());

// mongoose connection
mongoose
  .connect(`${process.env.MongoDBConnection}`, {
    dbName: "BoycottIndianProduct",
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("mongodb connection error", err));

app.get("/", (req, res) => {
  res.send("Boycott Indian Products server");
});

// all post routes

app.post("/api/bcip/v1/allproducts/post", async (req, res) => {
  try {
    const data = req.body;
    const newProduct = allproduct(data);
    const result = await newProduct.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// all get routes

app.get("/api/bcip/v1/allproducts/get", async (req, res) => {
  const result = await allproduct.find();
  res.send(result);
});

// all updates routes

app.put("/api/bcip/v1/allproducts/update/:id", async (req, res) => {
  try {
    const updatedData = req.body;
    const id = req.params.id;
    const result = await allproduct.updateOne(
      { _id: id },
      { $set: updatedData },
      { upsert: true }
    );
    res.send(result)
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// all delete routes

app.delete('/api/bcip/v1/allproducts/delete/:id' , async (req, res) => {
  try {
    const id = req.params.id
    const result = await allproduct.deleteOne({_id: id})
    res.send(result)
  } catch (error) {
    res.status(500).send(error.message);
  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
