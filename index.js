require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require("mongoose");
const port = process.env.PORT
const cors = require("cors");


// middlewares
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// mongoose connection
// mongoose
//   .connect(
//     ``,
//     { dbName: ""}
//   )
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log("mongodb connection error", err));

app.get('/', (req, res) => {
  res.send('Boycott Indian Products server')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})