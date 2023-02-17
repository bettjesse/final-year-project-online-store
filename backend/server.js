import express from "express";
import data from "./data.js";
const app = express();

//all products data
app.get("/api/products", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send(data.products);
  });
  //fetching  single product information
app.get("/api/products/slug/:slug", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const product = data.products.find((x) => x.slug === req.params.slug)
    if(product) {
      res.send(product)
    } 
    else {
        res.status(404).send({message: "product not found"})
    }
    
  });
app.get("/api/products/:id", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const product = data.products.find((x) => x._id === req.params.id)
    if(product) {
      res.send(product)
    } 
    else {
        res.status(404).send({message: "product not found"})
    }
    
  });
  

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
