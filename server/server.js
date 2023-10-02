const express = require('express');
var bodyParser = require('body-parser');
const ConnectDB = require('./connections/db_connection');

const process_image = require('./apis/process_image');
const insert_data = require('./apis/insert_data');

const app = express();
const router = express.Router();

ConnectDB();

app.use(express.json())
app.use(router)
app.use(bodyParser.raw({
    inflate: true, 
    type: 'image/jpeg',
    limit: '10mb'
  }));
app.use(bodyParser.json())

app.use('/process_image', process_image);
app.use('/insert_data', insert_data);

PORT = 3000;

app.listen(PORT, () => {
    console.log(`APP is listening at PORT: ${PORT}`);
})