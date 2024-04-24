
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
	db = client.db('Freeway');
	
	await app.listen(3000);
	let collection = db.collection('stations')
	console.log('Listening on port 3000');
	
};

startDbAndServer();

async function getTravelTime(req, res) {

	
	let collection = db.collection('loopData')
	let collectionDetectors = db.collection('detectors')
	let collectionStation = db.collection('stations')
	let loc = req.query.station
	let start = req.query.start
	let end = req.query.end;
	console.log(loc,start,end)
	//Query to find all detectors with our location
	let stationIDs = await collectionDetectors.find({locationtext: loc}).toArray()
	if(stationIDs.length === 0 ){
		console.log("No detectors found with that location")
		return 
	}
	// put all of the detecor ids into an array
	let detectorIDs = []
	let xx = 0 
	while(xx < stationIDs.length){
		detectorIDs.push(stationIDs[xx].detectorid)
		xx+=1
	}
	xx = 0
	let totalVolume = 0
	let totalSpeed = 0
	let countSpeed = 0
	let len = 0 
	//loop through all detecors 
	while(xx < detectorIDs.length){
		let volume = await collection.find({starttime: {$gte:start,$lte:end},detectorid: detectorIDs[xx]}).toArray()
		console.log("volume.find:",volume)
		let yy = 0 
		let stations = await collectionStation.find({locationtext: loc}).toArray()
		console.log("station.find",stations)
		len = stations[0].length
		console.log("len:",len)
		console.log("volume:",volume)
		if(volume.length === 0 ) break
		// get the volume 
		while(yy < volume.length){
			if(volume[yy].volume === undefined)
			{ 
			console.log("no element volume")
			}
			else
			{	
				console.log("volume:",volume[yy].volume)
				totalVolume+=volume[yy].volume
			}
			//get the spped 
			if(volume[yy].speed === undefined){
				console.log("no element speed")
			}else{
				console.log("speed",volume[yy].speed)
				totalSpeed += volume[yy].speed
				countSpeed += 1
			}
			yy+=1
		}
		xx+=1
	}
	//calulations 
	console.log("total Speed", totalSpeed)
	console.log("counts of speed inputs",countSpeed)
	console.log("avg speed:",totalSpeed/countSpeed)
	let avgSpeed = totalSpeed/countSpeed
	let travelTimeSeconds = len/avgSpeed * 3600
	console.log("Travel time in seconds:",travelTimeSeconds)
	console.log("Total Volume:", totalVolume)
	
	if(isNaN(travelTimeSeconds)){
		console.log("error")
		travelTimeSeconds = "Input Error"
		totalVolume = ""
	}
	//return calulations or error 
	const response = { time: travelTimeSeconds, volume: totalVolume };
	res.json(response);
}

app.get('/traveltime', jsonParser, getTravelTime);


async function update(req, res) {
	const body = req.body;
	

	let finalStatus = "success"
	let detectors = db.collection('detectors')
	let stations = db.collection('stations')
	let stationID = Number(req.body.station)
	let newName = req.body.newName
	let oldName = req.body.oldName
	// Check to see if the new name is already in the DB 
	let stationInfo = await stations.find({locationtext: newName}).toArray()
	if(stationInfo.length >= 1){
		console.log("new name is already in the DB")
		return
	}
	//filter is what we are looking to Update
	//update is what we are looking to update it with 
	let filter = {stationid:stationID , locationtext: oldName }
	let update = {$set:{locationtext: newName }}
	let resultsDetectors = await detectors.updateMany(filter,update)
	
	if(resultsDetectors.modifiedCount===0) 
	{
		console.log("no updates made to detectors collection")
		finalStatus = "Failed"
	}
	else
	{ 
	console.log("results for detectors:",resultsDetectors)
	}
	//modifiedCount is the amount of elements in the table changed
	let resultsStations = await stations.updateMany(filter,update)
	if(resultsStations.modifiedCount===0){ 
	console.log("no updates made to stations collection")
	finalStatus = "Failed"
	}
	else{ 
	console.log("results for detectors:",resultsDetectors)
	}
	const response = { result: finalStatus };

	res.json(response);
}

app.post('/updatestation', jsonParser, update)
