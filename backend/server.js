const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let data = require('./jobs');

app.use(bodyParser.json());
console.log(data);
const api = express.Router();

api.get('/jobs', (req, res) => {

	res.json(data);

});

app.use('/api', api); //localhost:4201/api/jobs

const port = 4201;

app.listen(port, () => {

	console.log(`listening on port ${port}`);

});