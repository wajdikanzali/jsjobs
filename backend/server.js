const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let data = require('./jobs');

let initialJobs = data.jobs;
let addedJobs = [];

const getAllJobs = () => {
	return [...addedJobs, ...initialJobs]
};

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-type');
	next();
});


const api = express.Router();

api.get('/jobs', (req, res) => {

	//res.json(data.jobs);
	res.json(getAllJobs());

});


api.post('/jobs', (req, res) =>{
	const job = req.body;
	addedJobs = [job, ...addedJobs];
	console.log('number of jobs', getAllJobs().length);
	res.json(job);

});

app.use('/api', api); //localhost:4201/api/jobs

const port = 4201;

app.listen(port, () => {

	console.log(`listening on port ${port}`);

});