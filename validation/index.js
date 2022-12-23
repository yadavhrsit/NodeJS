const { error, countReset } = require("console");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://batch6:herovired@cluster0.aqifkg2.mongodb.net/test")
  .then(() => console.log("Database Connected..."))
  .catch(() => console.log("Connection Failed...", error.message));

const productSchema = new mongoose.Schema({
  // schema
  pName: { type: String, required: true, lowercase: true }, // mongoose built in validator
  seller: String,
  tags: {
    type: Array,
    //enum: ["Electrnics", "Smartphones", "Home-Appliances"],
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "At least one Category is Required",
    },
  },
  date: { type: Date, default: Date.now },
  isInStock: Boolean,
});

const Product = mongoose.model("Product", productSchema); // model for schema

async function addProduct() {
  const product = new Product({
    // an object of model
    //pName: "Galaxy Note",
    seller: "Samsung",
    tags: ["Electronics", "Smartphones"],
    isInStock: true,
  });
  try {
    const result = await product.save();
    console.log(result);
  } catch (error) {
    //console.log(error.message);
    for (field in error.errors) {
      console.log(error.errors[field].message);
    }
  }
}
addProduct();

// Quering
async function getProducts() {
  const products = await Product.find({
    pName: "TV",
  })
    .limit(3) //max
    .sort({ isInStock: -1 }) // sort by ascending or descending 1 or -1
    .select({ seller: 1, tags: 1, _id: 0 }); // get only these objects

  console.log(products);

  // .count() // counts

  // eq = Equal
  // ne = not Equal
  // gt = greater than
  // lt = less than
  // gte = grater than equals
  // lte =  less than equals
  // in
  // nin = not in

  // .find({price:{$gte:1000, $lte:20000} });
  // .find({price:{$in:[1500,2000,2500]} });

  // or
  // and
  // .find()
  // .or([{seller:"Samsung"},{isInStock:"false"}])
  // .and([{seller:"Samsung"},{isInStock:"true"}])

  // regex
  // .find({seller:/pattern/});
  // .find({seller:/^S/});  // starts with S

  // pagination
  /* const pageNumber =  2;
  const pageSize = 10;
  .skip((pageNumber-1)*pageSize) 
  .limit(pageSize)*/
}
// getProducts();

async function updateProduct(id) {
  //const result = await Product.findById(id); //Query First Method
  const result = await Product.updateOne(
    { _id: id }, // first parameter a Query
    {
      $set: {
        // second param will be update operator
        seller: "Vivo",
        isInStock: false,
      },
    }
  );
  //const result = await Product.updateMany({isInStock:false});
  console.log(result);
}
//updateProduct("63a2dfa80b5c3a5f94009d9c");

async function deleteProduct(id) {
  const result = await Product.deleteOne({ _id: id });
  console.log(result);
}
// deleteProduct("63a2dfa80b5c3a5f94009d9c");
