const express = require('express')
const router = express.Router();
const Jimp = require('jimp');
const { createWorker } = require('tesseract.js');

const processText = async (text) => {
    const textList = text.split('\n').filter((t) => {
        return t.length > 0;
    })
    let gender_idx, dob_idx, name_idx, date_idx;
        var gender, dob, name;
        for(let i = 0; i < textList.length; i++){
            if(textList[i].toLowerCase().includes('female')){
                gender_idx = i;
                gender= 'FEMALE';
                dob_idx = i-1;
                name_idx = i-2;

                date_idx = textList[dob_idx].search('[0-9]{2}/[0-9]{2}/[0-9]{4}');
                dob = textList[dob_idx].slice(date_idx, date_idx+10);

                let pattern = /^[A-Z][a-z]+$/
                let lis = textList[name_idx].split(' ');
                let name_list = lis.filter((text) => (text.length > 1) && (pattern.test(text)));

                if(name_list.length){
                    name = name_list.join(" ");
                }

                if(gender && name && dob){
                    break
                }
            }
            else if(textList[i].toLowerCase().includes('male')){
                gender_idx = i;
                gender= 'MALE';
                dob_idx = i-1;
                name_idx = i-2;

                date_idx = textList[dob_idx].search('[0-9]{2}/[0-9]{2}/[0-9]{4}');
                dob = textList[dob_idx].slice(date_idx, date_idx+10);
                let pattern = /^[A-Z][a-z]+$/
                let lis = textList[name_idx].split(' ');
                let name_list = lis.filter((text) => (text.length > 1) && (pattern.test(text)));

                if(name_list.length){
                    name = name_list.join(" ");
                }

                if(gender && name && dob){
                    break
                }
            }
        }
    if(gender && name && dob){
        return { gender: gender, name : name, dob : dob};
    }
    else{
        return null;
    }
}

const processImage = async (file) => {
    Jimp.read(file, function (err, image) {
        if (err) throw err;
        image.greyscale().contrast(1)
        image.write("out.png")
    });

    const worker = await createWorker('eng');
    const { data: { text } } = await worker.recognize('out.png');
    
    await worker.terminate();

    let data = processText(text)
    return data;
}

router.post('/', async (req, res) => {
    try{
        let file = req.body;
        let result = await processImage(file);
        if(result){
            res.status(200).send({ response : result});
        }
        else{
            res.status(204).send({ response : {}});
        }
    }
    catch(err){
        console.log(err);
    }
    
})

module.exports = router;