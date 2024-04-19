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

async function helloworld(req, res) {
	console.log(req.query.name);
	const response = { message: "Hello " + req.query.name + "!" };
	res.json(response);
}

app.get('/hello', jsonParser, helloworld); 

async function getTravelTime(req, res) {
	const start = Number(req.query.start);
	const end = Number(req.query.end);
	const result = end - start;
	const response = { time: result };
	res.json(response);

}

app.get('/traveltime', jsonParser, getTravelTime);
//async function onSaveCard(req, res) {
//	const card = req.body; // Gets the body (Card details)
//	const collection = db.collection('card'); 
//	const result = await collection.insertOne(card); // Saves the card
//	const cardID = result.insertedId; // Gets the ObjectId of card
//	res.json({ cardId: cardID }); // Sends the ObjectId in the JSON response
//}
//app.post('/save', jsonParser, onSaveCard);

/*
 * Complete the onGetCard function, which takes in an HTTP request 'req'.
 * 'req' is sent when _loadCard() in "public/js/card-view.js" is executed
 * or when a URL (e.g., http://localhost:3000/id/5bbb8a07ebbf6a9cf4d839f5)
 * is entered in your browser. The request sends a cardID to the Node server.
 * The cardID is also a document ID in MongoDB.
 *
 * After receiving the request, the Node server should search the cardID in
 * the 'card' collection and return the content of the stored document matching
 * the cardID to the browser.
 */ 

//async function onGetCard(req, res) {
//	return;
//	const cardID = req.params.cardId; // Gets the cardId (ObjectId)
//	const collection = db.collection('card');
//	const query = { _id: ObjectId(cardID) }; // Constructs the query
//	const card = await collection.findOne(query); // Gets the associated card
//	res.json(card); // Sends the card in the JSON response
//}
//app.get('/get/:cardId', onGetCard);
//
//async function onGetCardView(req, res) {
//  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
//}
//app.get('*', onGetCardView);
