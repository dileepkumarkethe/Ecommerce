var Product = require('../models/product');

var mongoose = require('mongoose');
const { exists } = require('../models/product');

mongoose.connect("mongodb://localhost:['YOUR_DB_PORT]/shopping", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
var products = [
    new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
    title:'Gothic Video Game',
    description: 'Awesome Game!!!',
    price: 10

}),
new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
    title:'Gothic Video Game',
    description: 'Awesome Game!!!',
    price: 20
}),
new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
    title:'Gothic Video Game',
    description: 'Awesome Game!!!',
    price: 40
}),
new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
    title:'Gothic Video Game',
    description: 'Awesome Game!!!',
    price: 15
}),
new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
    title:'Gothic Video Game',
    description: 'Awesome Game!!!',
    price: 50
}),

];
var done =0;
for(var i=0;i<products.length;i++){
    products[i].save(function(err, result){
        done++;
        if(done == products.length){
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}

