import express from 'express';
import bodyParser from 'body-parser';
import { csvAppend } from "csv-append";
import fs from 'node:fs'
import csv from 'csvtojson'

const PATH_TO_CSV = `./output.csv`;


const app = express();
const port = 3000;

async function saveToCsv(input){
  let csvFn
  if (fs.existsSync(PATH_TO_CSV)){
    csvFn = csvAppend(PATH_TO_CSV, true);
  } else {
    csvFn = csvAppend(PATH_TO_CSV);
  }
  csvFn.append(input)
  await csvFn.end()
}

async function getDataFromCsv(){
  return csv().fromFile(PATH_TO_CSV);
}

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());


app.post('/rating', async (req, res) => {
  console.log(req.body)
  await saveToCsv(req.body)
  res.status(200).send('Rating received')
});

app.get('/stat', async(req, res)=>{
  const data = await getDataFromCsv()
  res.status(200).json(data)
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


