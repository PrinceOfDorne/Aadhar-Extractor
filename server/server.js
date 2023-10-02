const express = require('express');
const cors = require("cors");
var bodyParser = require('body-parser');
const ConnectDB = require('./connections/db_connection');

const process_image = require('./apis/process_image');
const insert_data = require('./apis/insert_data');

const app = express();
const router = express.Router();

ConnectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

writeENV();

app.use(express.json())
app.use(router)
app.use(bodyParser.raw({
    inflate: true, 
    type: 'image/jpeg',
    limit: '10mb'
  }));
app.use(bodyParser.json())
app.use(express.static(__dirname.replace(/\\/g, "/") + '/view/dist'))

app.use('/process_image', process_image);
app.use('/insert_data', insert_data);

function writeENV() {
  if (process.env.NODE_ENV) {
      let content = "(function (window) {" +
          "window.__env = window.__env || {};" +
          "window.__env.SERVER_URL = '" + process.env.SERVER_URL + "';" +
          "}(this));"
      fs.writeFile(path.join(__dirname.replace(/\\/g, "/"), '/view/dist/assets/environments/env.js'), content, (err) => {
          if (err) throw err;
          console.log('SERVER_URL :', process.env.SERVER_URL)
          console.log('Successfully saved env.js file.');
      });
  }
}

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
    console.log(`APP is listening at PORT: ${PORT}`);
})