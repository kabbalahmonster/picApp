let express = require("express");
let cors = require('cors');
let MongoClient = require("mongodb").MongoClient;
let bodyParser = require("body-parser");
let sanitizer = require("express-sanitizer");
let objectId = require("mongodb").ObjectID;

// MongoDB constants
const URL = "mongodb://localhost:27017/";
const DB_NAME = "photos";

// construct application object via express
let app = express();
// add cors as middleware
app.use(cors());
// add body parser middleware to parse
app.use(bodyParser.json());
// add sanitizer to clean all JSONincoming data
app.use(sanitizer());

// express static middleware - setup static files location
app.use(express.static('./dist'));



app.get("/get", async (request, response) => {
    // Use connect method to connect to the server
    try {

        // construct MongoClient object for working with MongoDB
        let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });

        await mongoClient.connect(); 
        // convert all documents in photos collection into array in one awesome statement!
        let photoArray = await mongoClient.db(DB_NAME).collection("photos").find().toArray();
        // close mongoClient (connection to MongoDB server)
        mongoClient.close();
        let json = { "photos": photoArray };

        // set status code
        response.status(200);
        // serializes sampleJSON to string format
        response.send(json);
    } catch (error) {
        console.log(`>>> ERROR : ${error}`);
        response.status(500);
        response.send({error: `Server error with get : ${error}`});
        throw error;
    }
});



app.post("/post", async (request, response) => {
    // Use connect method to connect to the server
    try {

        // construct MongoClient object for working with MongoDB
        let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });

        await mongoClient.connect(); 
        // convert all documents in photo collection into array in one awesome statement!
        let photoCollection = await mongoClient.db(DB_NAME).collection("photos");
        
        
        request.body.photoId = request.sanitize(request.body.photoId);
        request.body.author = request.sanitize(request.body.author);
        request.body.comment = request.sanitize(request.body.comment);
        console.log(">>>> post photoID : " + request.body.photoId +"\n>>" + request.body.author);

        // add the new document into MongoDB
        //let result = await photos.updateOne(_{id: request.body.photoId},);
        let result = await photoCollection.updateOne({_id: objectId(request.body.photoId)},
                                            {$push: {"comments": {
                                                $each:[{"author":request.body.author,
                                                        "comment":request.body.comment}],
                                                        $position:0}}});
        mongoClient.close();
        
        response.status(200);
        response.send(result);



    } catch (error) {
        console.log(`>>> ERROR : ${error}`);
        response.status(500);
        response.send({error: `Server error with get : ${error}`});
        throw error;
    }
});



app.put("/put", async (request, response) => {
    // Use connect method to connect to the server
    try {

        // construct MongoClient object for working with MongoDB
        let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });

        await mongoClient.connect(); 
        // convert all documents in photo collection into array in one awesome statement!
        let photoCollection = await mongoClient.db(DB_NAME).collection("photos");
        
        
        request.body.photoId = request.sanitize(request.body.photoId);
        request.body.author = request.sanitize(request.body.author);
        request.body.comment = request.sanitize(request.body.comment);
        console.log(">>>> post photoID : " + request.body.photoId +"\n>>" + request.body.author);

        // add the new document into MongoDB
        //let result = await photos.updateOne(_{id: request.body.photoId},);
        let result = await photoCollection.updateOne({_id: objectId(request.body.photoId)},
                                            {$push: {"comments": {
                                                $each:[{"author":request.body.author,
                                                        "comment":request.body.comment}],
                                                        $position:0}}});
        mongoClient.close();
        
        response.status(200);
        response.send(result);



    } catch (error) {
        console.log(`>>> ERROR : ${error}`);
        response.status(500);
        response.send({error: `Server error with get : ${error}`});
        throw error;
    }
});

/*
app.delete("/delete/:id", async (request, response) => {
    // Use connect method to connect to the server
    try {

        // construct MongoClient object for working with MongoDB
        let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });

        await mongoClient.connect(); 
        // convert all documents in technologies collection into array in one awesome statement!
        let techCollection = await mongoClient.db(DB_NAME).collection("technologies");
        
        let id = objectId(request.params.id);      

        // building our update query
        let selector = {"_id":id};
        let newValue = {$set:{"name":request.body.name,"description":request.body.description,"difficulty":request.body.difficulty,"courses":request.body.courses} };

        // add the new document into MongoDB
        let result = await techCollection.deleteOne(selector);
        mongoClient.close();    
        
        response.status(200);
        response.send(result);


    } catch (error) {
        console.log(`>>> ERROR : ${error}`);
        response.status(500);
        response.send({error: `Server error with get : ${error}`});
        throw error;
    }
});*/



app.listen(8088, () => console.log("Listening on port 8088"));