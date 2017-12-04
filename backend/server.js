const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let data = require('./jobs');

let initialJobs = data.jobs;
let addedJobs = [];

const fakeuser = {email: 'wajdi@test.fr', password: 'admin'};
const secret = 'qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq';
const jwt = require('jsonwebtoken');

const getAllJobs = () => {
	return [...addedJobs, ...initialJobs]
};

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});


const api = express.Router();
const auth = express.Router();

auth.post('/login', (req, res) => {
	 if(req.body) {
    const email = req.body.email.toLocaleLowerCase();
    const password = req.body.password.toLocaleLowerCase();
    if(email === fakeuser.email && password === fakeuser.password) {
    	delete req.body.password;
    	//res.json({success: true, data: req.body});
    	const token = jwt.sign({ iss: 'http://localhost:4201', role: 'admin', email: req.body.email}, secret);
    	res.json({ success: true, token: token });
    } else {
    	res.json({success: false, message: 'identifiants incorrectes'});
    }
  } else {
  	res.json({success: false, message: 'données manquantes'});
  }
})

   


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

api.get('/search/:term/:place?', (req, res) => {
	const term = req.params.term.toLowerCase().trim();
	let place = req.params.place;
	let jobs = getAllJobs().filter(j => (j.description.toLowerCase().includes(term) || j.description.toLowerCase().includes(term) ));
	if(place) {
		place = place.toLowerCase().trim();
		jobs = jobs.filter(j => (j.city.toLowerCase().includes(place)));
	}
	res.json({success: true, jobs: jobs});

});

api.get('/jobs/:id', (req, res) => {
	console.log("*****",req);
	const id = parseInt(req.params.id, 10);
	const job = getAllJobs().filter(j => j.id === id);
	if (job.length === 1){
		res.json({success: true, job: job[0]});
	}else {
		res.json({success: false, message: `pas de job ayant pour id ${id}`})
	}
});

app.use('/api', api); //localhost:4201/api/jobs
app.use('/auth', auth);

const port = 4201;

app.listen(port, () => {

	console.log(`listening on port ${port}`);

});