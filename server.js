const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const MONGO_URL = 'mongodb://localhost:27017';
const app = express();
const jsonParser = bodyParser.json();


app.use(express.static('public'));

let db = null;

async function startDbAndServer() {
	// Starts the MongoDB server, and listens for connections
	
	client = await mongodb.connect(MONGO_URL);
	//db = client.db('freeway-db');
	await app.listen(3000);
	console.log('Listening on port 3000');
	db = client.db('demo');
    	let collection = db.collection('demoCollection');
    	//collection.find({}).toArray((err, documents) => {
  	//if (err) console.error(err);
  	//else console.log("Found documents:", documents);

};

startDbAndServer();

async function getTravelTime(req, res) {
	const start = Number(req.query.start);
	const end = Number(req.query.end);
	const result = end - start;
	const response = { time: result };
	res.json(response);
}

app.get('/traveltime', jsonParser, getTravelTime);


async function update(req, res) {
	const body = req.body;
	
	console.log(body);

	const response = { test: "Test" };

	res.json(response);

}

app.post('/updatestation', jsonParser, update)

