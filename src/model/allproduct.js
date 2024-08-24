const { default: mongoose } = require("mongoose");

const allproductSchema = new mongoose.Schema({
  
  type:{
    type: String,
    require: true
  },
  productName: {
    type: String,
    require: true
  },
  productImg: {
    type: String,
    require: true
  },
  company: {
    type: String,
    require: true
  },
  origin: {
    type: String,
    require: true
  },
  category: {
    type: String,
    require: true
  },
  alt: [
    {
      productName: {
        type: String,
      },
    }, 
  ],
});

const allproduct = mongoose.model("allproducts", allproductSchema);

module.exports = allproduct;
