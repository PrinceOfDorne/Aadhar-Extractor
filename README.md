# Aadhar-Extractor

This is a web Portal which extracts the data from the uploaded Aadhar Cards and uploads it to the DB.

Installation:
1. To run the project on local, User needs to cloan the repo.
2. Login to Mongo DB Atlas Account and whitelist the Current IP. Also Create a new cluster and Database.
3. Create a .env file and insert the following data in it:
    ##PASSWORD = Password of Mongo Atlas 
    ##USERNAME = Username of Mongo Atlas 
    ##DBNAME  = Database Created of Mongo Atlas 
    ##CLUSTER = Cluster Created of Mongo Atlas 
4. Go to the server director and run the command 'npm start'.
5. Go the the client directory and run the comman 'ng serve'.
6. Run the application in the browser using the url "localhost:4200"
