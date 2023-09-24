// Budget API

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const fs = require('fs');

app.use(cors());

const server_data = fs.readFileSync('server-data.json', 'utf8'); 


app.get('/budget', (req, res) => {
    res.send(server_data);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});