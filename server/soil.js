var express= require('express');
var BayesClassifier = require('bayes-classifier');
var classifier = new BayesClassifier();
var fill = require('fill-range');

var router = express.Router();

var firebaseInfo = require('./firebase-info.js');

// requireing firebase
var firebase = require('firebase');
// initializing firebase base
var app = firebase.initializeApp(firebaseInfo);

var db = firebase.database();



router.post('/data',function(req,res){

	var datax = req.body.name;
	console.log(datax);
 
    // var a = "3 15 high wet+"
     
	// all the functionality will be here
   db.ref().child('soils').once('value').then(function(snapshot){
		data = snapshot.val();
			
		for(var a in data){
			 
			 var fruitName = a;
             var fruitData = data[a];

             // getting ranges in arrays
             var tempRange = fill(fruitData.temp.min,fruitData.temp.max);
             var phRange = fill(fruitData.ph.min,fruitData.ph.max);
             // converting them to strings
             tempRange = tempRange.join(" ");
             phRange = phRange.join(" ");
             // assigning them to variables
             var temp = tempRange;
             var ph = phRange;
             var sunlight = fruitData.sunlight;
             var moisture = fruitData.moisture;
             
             //making document 
             var Document = [
                  ph, //ph
				  temp, //temp
				  sunlight, //sunlight
				  moisture   //humidity
			  ]

             // adding document
			 classifier.addDocuments(Document, fruitName);
	  }

		classifier.train();
         
	
        res.json(classifier.classify(datax)); 
		
   })
  

});

module.exports = router;