--Required--

For our project we used MongoDBCompass to load our collections
The tool can be found here https://www.mongodb.com/products/tools/compass


To run the program, execute the following steps in the project directory:

1. Run command: npm install (a package.json file is included)

2. Run command: mkdir -p data/db

3. Run command: mongod -dbpath data/db

4. Open MongoDBCompass

5. Connect to database with following URL: mongodb://localhost:27017/

6. In the "Databases" tab, Click on "Create database" and give the following names:
	
	Database Name: Freeway
	
	Collection Name: loopData

7. In the loopData collection, click "add data" and then import the csv: freeway_loopdata.csv

8. In the Freeway database, create a collection with the name: highways

9. In the highways collection, click "add data" and the import the csv: highway.csv

10. In the Freeway database, create a collection with the name: detectors

11. In the detectors collection, click "add data" and then import the csv: detectors.csv

12. In the Freeway database, create a new collection with the name: stations

13. In the detectors collection, click "add data" and then import the csv: stations.csv
 
14. Now in separate terminal, run command: node server.js
 
15. Open a browser, and type "http://localhost:3000" to connect to the webpage

Once on the webpage, you can use the app as described in the assignment document. 


--Compute page--

For the compute page, inputs must follow the exact format given in the CSVs. 

Here's an example for the inputs:

start date/time: 2011-09-15 00:00:00-07
end date/time: 2011-09-15 00:01:20-07
station: Sunnyside NB


--Update page--

For the inputs, you must enter a valid station ID, a valid old name (exists in database), 
and any new name that you want. 

Here's an example:

station ID: 1045
Old name: Sunnyside NB
New Name: Bob


