//https://www.npmjs.com/package/mongoose
const mongoose = require('mongoose');
// Connection URL
const url = 'mongodb://localhost:27017';
mongoose.connect('mongodb://localhost:27017/fruitsDB',{ useNewUrlParser: true });
// Database Name
const fruitSchema = new mongoose.Schema({
  name:{
    type:String,
    require:[true,"Please check you data entry,no name specified "]
  },
  rating:{
    type:Number,
    min:1,
    max:10
  },
  review:String
});
const Fruit = mongoose.model("Fruit",fruitSchema);
const fruit=new Fruit({
  
  rating:10,
  review:"Pretty are yummys"
});
//  fruit.save();


const personSchema =new mongoose.Schema({
name:String,
age:Number,
favouriteFruit: fruitSchema
});
const Person=mongoose.model("Person",personSchema);

const pineapple = new Fruit({
  name:"Pineapple",
  score:9,
  review:"Great fruit"
});
pineapple.save();

Person.updateOne({name:"John"},{favouriteFruit:pineapple},function (err) {
  if(err){
    console.log(err);
  }else{
    console.log("Sucess update one");
    
  }
  
})

const person=new Person({
name:"Amy",
age:12,
favouriteFruit:pineapple
});

 person.save();

//https://mongoosejs.com/docs/api.html#model_Model.insertMany
// Fruit.insertMany([Kiwi,Orange,banana],function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Sucess");
//   }
// });

Fruit.find(function (err,fruits) {

  if (err) {
    console.log(err);
  }else{
  mongoose.connection.close();
    fruits.forEach(function(fruitin) {
      console.log(fruitin.name);  
    });
  }
});

// //https://mongoosejs.com/docs/api.html#Model   **Model.update()**
// Fruit.updateOne({_id:"5c92608055f180339c1634db"},{name:"Peach"},function (err) {
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Sucess update");
//   }
// })


//https://mongoosejs.com/docs/api.html#model_Model.deleteOne
Fruit.deleteOne({name:"Peach"},function (err) {
  if(err){
    console.log(err);
  }else{
    console.log("sucess delete"); 
  }
})




  // const findDocuments = function(db, callback) {
  //   // Get the documents collection
  //   const collection = db.collection('fruits');
  //   // Find some documents
  //   collection.find({}).toArray(function(err, fruits) {
  //     assert.equal(err, null);
  //     console.log("Found the following records");
  //     console.log(fruits)
  //     callback(fruits);
  //   });
  // }