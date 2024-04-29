To run the program, execute the following steps in the Freeway directory:

1. Run command: npm install

2. Run command: mongod -dbpath data/db

3. In separate terminal, run command: node server.js

4. Open a browser, and type "http://localhost:3000" to connect to the webpage

Once on the webpage, you can use the app as described in the assignment document. 

--Compute page--

For the compute page, inputs must follow the exact format given in the CSVs. 

Here's an example for the inputs:

start date/time: 2011-09-15 00:00:00-07
end date/time: 2011-09-15 00:01:20-07
station: Johnson Cr NB

--Update page--

For the inputs, you must enter a valid station ID, a valid old name (exists in database), 
and any new name that you want. 

Here's an example:

station ID: 1046
Old name: Johnson Cr NB
New Name: Bob


