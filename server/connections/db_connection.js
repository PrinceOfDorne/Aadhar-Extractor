const mongoose = require('mongoose');
require('dotenv').config()

const USERNAME = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DBNAME  = process.env.DBNAME;
const CLUSTER = process.env.CLUSTER;

const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}.szbwqgq.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;

const ConnectDB = async () => {
    const conn = await mongoose.connect(uri);
    console.log("DB Connection Established!");
}

module.exports = ConnectDB