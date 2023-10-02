var aws = require('aws-sdk'); 

aws.config.update({
    credentials: {
     access_key_id: process.env.AWS_ACCESS_KEY_ID,
     secret_access_key: process.env.AWS_SECRET_ACCESS_KEY
    }
   });

module.exports = aws;