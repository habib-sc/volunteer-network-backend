const express = require('express');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;

const app = express()

// Middlewear 
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Volunteer Network Server');
});



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@volunteernetwork.dv1mu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try {
        await client.connect();
        console.log('Database Connected');
    }
    finally {

    }
}
run().catch(console.dir);




app.listen(port, () => {
    console.log('Listening port', port);
});