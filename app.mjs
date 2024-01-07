import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());


app.post('/rating', (req, res) => {
  console.log(req.body)
  res.status(200).send('Rating received');
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
