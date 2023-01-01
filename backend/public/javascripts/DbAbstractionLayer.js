const { response } = require('express');
var mongodb = require('mongodb');

var connected = false;
var db = null;
const cart = require('../models/cart') ;

mongodb.MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true}).then(connection => {
  connected = true;
  db=connection.db('projet_shop');
  console.log("DB connection successful");
}).catch(error => {
  console.log("error in connecting to DB");
});


// GET PCs
async function queryPCsCollection(){
    if(connected){
        //get data from db
        let jsonResponse = {
            "handsetCards": [],
            "WebCards": []
          };
          
          const pcsCollectionArray = await db.collection('pc').find().toArray();
                
          pcsCollectionArray.forEach(element => {
                    let handsetElement = {}
                    handsetElement['ref']=element['ref'];
                    handsetElement['title']=element['title'];
                    handsetElement['description']=element['description'];
                    handsetElement['prix']=element['prix'];
                    handsetElement['imageName']=element['imageName'];
                    handsetElement['rows']=element['handsetRows'];
                    handsetElement['cols']=element['handsetCols'];
                    jsonResponse.handsetCards.push(handsetElement);
      
                    let WebElement = {};
                    WebElement['ref']=element['ref'];
                    WebElement['title']=element['title'];
                    WebElement['description']=element['description'];
                    WebElement['prix']=element['prix'];
                    WebElement['imageName']=element['imageName'];
                    WebElement['rows']=element['handsetRows'];
                    WebElement['cols']=element['handsetCols'];
                    jsonResponse.WebCards.push(WebElement);
                });
      
                return jsonResponse;
         
    }else{
        return null
    }
}

//GET electronique
async function queryelectroniqueCollection(){
  if(connected){
      //get data from db
      let jsonResponse = {
          "handsetCards": [],
          "WebCards": []
        };
        
        const electroniqueCollectionArray = await db.collection('electronique').find().toArray();
              
        electroniqueCollectionArray.forEach(element => {
                  let handsetElement = {}
                  handsetElement['ref']=element['ref'];
                  handsetElement['title']=element['title'];
                  handsetElement['description']=element['description'];
                  handsetElement['prix']=element['prix'];
                  handsetElement['imageName']=element['imageName'];
                  handsetElement['rows']=element['handsetRows'];
                  handsetElement['cols']=element['handsetCols'];
                  jsonResponse.handsetCards.push(handsetElement);
    
                  let WebElement = {};
                  WebElement['ref']=element['ref'];
                  WebElement['title']=element['title'];
                  WebElement['description']=element['description'];
                  WebElement['prix']=element['prix'];
                  WebElement['imageName']=element['imageName'];
                  WebElement['rows']=element['handsetRows'];
                  WebElement['cols']=element['handsetCols'];
                  jsonResponse.WebCards.push(WebElement);
              });
    
              return jsonResponse;
       
  }else{
      return null
  }
}



//GET telephone

async function querytlfCollection(){
  if(connected){
      //get data from db
      let jsonResponse = {
          "handsetCards": [],
          "WebCards": []
        };
        
        const electroniqueCollectionArray = await db.collection('telephone').find().toArray();
              
        electroniqueCollectionArray.forEach(element => {
                  let handsetElement = {}
                  handsetElement['ref']=element['ref'];
                  handsetElement['title']=element['title'];
                  handsetElement['description']=element['description'];
                  handsetElement['prix']=element['prix'];
                  handsetElement['imageName']=element['imageName'];
                  handsetElement['rows']=element['handsetRows'];
                  handsetElement['cols']=element['handsetCols'];
                  jsonResponse.handsetCards.push(handsetElement);
    
                  let WebElement = {};
                  WebElement['ref']=element['ref'];
                  WebElement['title']=element['title'];
                  WebElement['description']=element['description'];
                  WebElement['prix']=element['prix'];
                  WebElement['imageName']=element['imageName'];
                  WebElement['rows']=element['handsetRows'];
                  WebElement['cols']=element['handsetCols'];
                  jsonResponse.WebCards.push(WebElement);
              });
    
              return jsonResponse;
       
  }else{
      return null
  }
}


//GET All cards
const findAllCards = (req,res) => {
  cart.find().then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "some error occured while retreiving tutorials."
    });
  });
};


//insert card
const store = (req, res, next) => {
  let Cart = new cart({
    ref: req.body.ref,
    title: req.body.title,
    amount: req.body.amount,
    prix: req.body.prix,
  })
  Cart.save().then(response => {
    res.json({
      message: 'product added successfully'
    })
  })
  .catch(error => {
    res.json({
      message: 'An error occured'
    })
  })
}

module.exports = {queryPCsCollection,queryelectroniqueCollection,querytlfCollection, store,findAllCards,} 