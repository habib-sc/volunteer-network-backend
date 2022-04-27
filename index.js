const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;

const app = express()

// Middlewear 
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Volunteer Network Server');
});


app.listen(port, () => {
    console.log('Listening port', port);
});