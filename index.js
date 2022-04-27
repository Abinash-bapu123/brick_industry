const Express = require("express");
const BodyParser = require("body-parser");
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);
const dbName = "brick_industry";
var app = Express();
const port = 3000
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

async function startMongo() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('user');

    // the following code examples can be pasted here...
    const findResult = await collection.find({}).toArray();
    console.log(findResult[0].name)
    return findResult;
}
app.get('/', (req, res) => {
    startMongo().then(console.log)
        .catch(console.error)
        .finally(() => client.close());
    res.send('{"hi":"hello"}')
})

app.listen(port)