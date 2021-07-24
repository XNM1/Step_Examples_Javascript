const express = require("express");
const mongoose = require("mongoose");

/* -------------------------------------------------------------------------- */
/*                                   Models                                   */
/* -------------------------------------------------------------------------- */

const Product = mongoose.model("Product", {
    name: String,
    price: Number,
    count: Number,
    description: String,
    picture: String
});


const app = express();
const jsonParser = express.json();

app.use(jsonParser);

/* -------------------------------------------------------------------------- */
/*                                  Product CRUD                              */
/* -------------------------------------------------------------------------- */

app.get("/api/v1/products", function (req, res) {
    Product.find({}, function (error, products) {
        if (error) console.log(error);
        res.send(products);
    });
});

app.get("/api/v2/products/:id", function (req, res) {
    const id = req.params.id;
    Product.findOne({
        _id: id
    }, function (error, product) {
        if (error) console.log(error);
        res.send(product);
    });
});

app.post("/api/v1/products", function (req, res) {
    const name = req.body.name;
    const price = req.body.price;
    const count = req.body.count;
    const description = req.body.description;
    const picture = req.body.picture;
    const product = new Product({
        name,
        price,
        count,
        description,
        picture
    });
    product.save(function (error) {
        if (error) console.log(error);
        res.send(product);
    });
});

app.put("/api/v1/products/:id", function (req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const price = req.body.price;
    const count = req.body.count;
    const description = req.body.description;
    const picture = req.body.picture;
    const newProduct = new Product({
        name,
        price,
        count,
        description,
        picture
    });
    Product.findOneAndUpdate({_id: id}, newProduct, {new: true}, function(error, product){
        if(error) return console.log(error);
        res.send(product);
    });
});

app.delete("/api/v1/products/:id", function (req, res) {
    const id = req.params.id;
    Product.findByIdAndDelete(id, function (error, product) {
        if (error) console.log(error);
        res.send(product);
    });
});


mongoose.connect("mongodb://localhost:27017/productdb", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}, function (error) {
    if (error) console.log(error);
    app.listen(81, () => console.log("Server backend is working..."));
});