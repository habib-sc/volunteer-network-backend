const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

const app = express()

// Middlewear 
app.use(cors());
app.use(express.json());

// Root Endpoint 
app.get('/', (req, res) => {
    res.send('Volunteer Network Server');
});


// DB Connection info 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@volunteernetwork.dv1mu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try {
        // Connecting db 
        await client.connect();
        const eventsCollection = client.db('VolunteerNetwork').collection('Events');
        const usersCollection = client.db('VolunteerNetwork').collection('Users');

        // Events get endpoint -- http://localhost:5000/events
        app.get('/events', async (req, res) => {
            const query = {}
            const cursor = eventsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        // Users get endpoint -- http://localhost:5000/users
        app.get('/users', async (req, res) => {
            const query = {}
            const cursor = usersCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        // Event post endpoint -- http://localhost:5000/event/add
        app.post('/event/add', async(req, res) => {
            const event = req.body;
            const result = await eventsCollection.insertOne(event);
            res.send(result);
        });
        
        // User post endpoint -- http://localhost:5000/new-user
        app.post('/new-user', async(req, res) => {
            const event = req.body;
            const result = await usersCollection.insertOne(event);
            res.send(result);
        });


        // User detail endpoint -- http://localhost:5000/user/email
        app.get('/user/:email', async(req, res) => {
            const email = req.params.email;
            const query = {email: email};
            const result = await usersCollection.findOne(query);
            res.send(result);
        });

        // Event Update endpoint -- http://localhost:5000/event/edit/id
        app.put('/event/edit/:id', async(req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = {_id: ObjectId(id)};
            const options = { upsert: true}
            const updateDocument = {
                $set: {
                   title: data.title,
                   text: data.text,
                   img: data.img
                },
            }
            const result = await eventsCollection.updateOne(filter, updateDocument, options);
            res.send(result);
        });

        // Event Delete endpoint -- http://localhost:5000/event/delete/id
        app.delete('/event/delete/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await eventsCollection.deleteOne(query);
            res.send(result);
        });

    }
    finally {

    }
}
run().catch(console.dir);




app.listen(port, () => {
    console.log('Listening port', port);
});