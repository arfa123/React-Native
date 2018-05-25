var router = require('express').Router();
const Speech = require('@google-cloud/speech');
const fs = require('fs');

const projectId = 'hackathon-batch4';
const speechClient = Speech({
    projectId: projectId
  });

const fileName = './src/audio.flac';
const file = fs.readFileSync(fileName);
const audioBytes = file.toString('base64');
const audio = {
    content: audioBytes
  };
const config = {
    encoding: 'FLAC',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
    enableWordTimeOffsets: false
};
const request = {
    audio: audio,
    config: config
};

function protected(req,res,next){
    res.send("pagal");
}
function convert(req,res,next){
    var res = speechClient.recognize(request)
    console.log("res:"+res)
    // .then((data) => {
    //   const response = data[0];
    //   const transcription = response.results.map(result =>
    //       result.alternatives[0].transcript).join('\n');
    //   console.log(`Transcription: ${transcription}`);
    // })
    // .catch((err) => {
    //   console.error('ERROR:', err);
    // });
}

router.route('/').get(protected);
router.route('/convert').get(convert);

module.exports = router;