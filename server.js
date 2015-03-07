
var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('pfebase', ['pfebase']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/pfebase', function (req, res) {
	db.pfebase.find(function (err, docs) {
		console.log(docs);
		res.json(docs);
	});
});

app.post('/pfebase', function (req, res) {
	db.pfebase.insert(req.body, function(err, doc) {
		res.json(doc);
	})
});

app.delete('/pfebase/:id', function (req, res) {
	var id = req.params.id;
	db.pfebase.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	})
});

app.get('/pfebase/:id', function (req, res) {
	var id = req.params.id;
	db.pfebase.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});

app.put('/pfebase/:id', function (req, res) {
	var id = req.params.id;
	db.pfebase.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {nom: req.body.nom,pnom: req.body.pnom, email: req.body.email, num: req.body.num}},
		new: true}, function (err, doc) {
			res.json(doc);
		});
});

app.listen(3000);
console.log("Démarrage du serveur réussi !! port : 3000");