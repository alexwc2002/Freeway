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
	db = client.db('freeway');
	
	await app.listen(3000);
	let collection = db.collection('stations')
	console.log('Listening on port 3000');
	
	//changeStationName()
};

startDbAndServer();


async function calculateTimeandVolume(){
	let collection = db.collection('loopData')
	let collectionDetectors = db.collection('detectors')
	let collectionStation = db.collection('stations')
	let loc = "Sunnyside NB"
	let stationIDs = await collectionDetectors.find({locationtext: loc}).toArray()
	if(stationIDs.length === 0 ){
		console.log("No detectors found with that location")
		return 
	}
	let detectorIDs = []
	let xx = 0 
	while(xx < stationIDs.length){
		detectorIDs.push(stationIDs[xx].detectorid)
		xx+=1
	}
	xx = 0
	let start = "2011-09-15 00:00:00-07"
	let end = "2011-09-15 00:00:40-07"
	let totalVolume = 0
	let totalSpeed = 0
	let countSpeed = 0
	let len = 0 
	while(xx < detectorIDs.length){
		let volume = await collection.find({starttime: {$gte:start,$lte:end},detectorid: detectorIDs[xx]}).toArray()
		let yy = 0 
		let stations = await collectionStation.find({locationtext: loc}).toArray()
		len = stations[0].length
		while(yy < volume.length){
			if(volume[yy].volume === undefined)
			{ 
			// console.log("no element volume")
			}
			else
			{
				totalVolume+=volume[yy].volume
			}
			if(volume[yy].speed === undefined){
				// console.log("no element speed")
			}else{
				// console.log("speed",volume[yy].speed)
				totalSpeed += volume[yy].speed
				countSpeed += 1
			}
			yy+=1
		}
		xx+=1
	}
	// console.log("total Speed", totalSpeed)
	// console.log("counts of speed inputs",countSpeed)
	// console.log("avg speed:",totalSpeed/countSpeed)
	let avgSpeed = totalSpeed/countSpeed
	let travelTimeSeconds = len/avgSpeed * 3600
	console.log("Travel time in seconds:",travelTimeSeconds)
	console.log("Total Volume:", totalVolume)
	// else console.log(results)
	
}

async function changeStationName(){
	let detectors = db.collection('detectors')
	let stations = db.collection('stations')
	let stationID = 1045
	let newName = "Sunnyside NB"
	let oldName = "YOOO"
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
		return
	}
	else
	{ 
	console.log("results for detectors:",resultsDetectors)
	}
	let resultsStations = await stations.updateMany(filter,update)
	if(resultsStations.modifiedCount===0){ 
	console.log("no updates made to stations collection")
	}
	else{ 
	console.log("results for detectors:",resultsDetectors)
	}

	
}
