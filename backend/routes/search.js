var express=require('express');
var router=express.Router();
var mongo=require('mongodb');
var assert=require('assert');

var url='mongodb://localhost:27017/projet_shop';
router.post('/search',function(req,res,next){
    var resultArray=[];
    var item=
    {
        title:req.body.name
    };
    mongo.connect(url,function(err,db){
       
        var cursor=db.collection('pc').find({title:item.title});
        cursor.forEach(function(doc,err){
            resultArray.push(doc);
        },function(){
            db.close();
            res.render('home',{result:resultArray});
        });
});
});