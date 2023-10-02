const express = require('express');
const User = require('../models/User')

const router = express.Router();

router.post('/', async (req, res) => {
    try{
        console.log("Insert Data : ", req.query)
        if(req.query.name && req.query.gender && req.query.dob){
            const userExist = await User.find({
                name : req.query.name,
                gender : req.query.gender,
                dob : req.query.dob
            })
            if(userExist.length){
                console.log("User already Exists")
                res.status(204);
                res.status(204).send({ msg: "User already exists"});
            }
            else{
                console.log("Data Inserted Successfully")
                await User.create({
                    name : req.query.name,
                    gender : req.query.gender,
                    dob : req.query.dob,
                    created_at: new Date()
                })
                res.status(200).send({msg: "User Created Successfully!"})
            }
        }
        else{
            res.status(400).send({ msg : "Incomplete Data" })
        }
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router;