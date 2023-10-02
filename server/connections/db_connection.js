const mongoose = require('mongoose');

const uri = "mongodb+srv://Vedic:123@cluster0.szbwqgq.mongodb.net/aadhar-db?retryWrites=true&w=majority";

const ConnectDB = async () => {
    const conn = await mongoose.connect(uri);
    console.log("DB Connection Established!");
}

module.exports = ConnectDB