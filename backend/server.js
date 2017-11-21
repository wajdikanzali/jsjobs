const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const api = express.Router();

api.get('/jobs', (req, res) => {

	res.json({ success: true, message: 'hello word' });

});

app.use('/api', api); //localhost:4201/api/jobs

const port = 4201;

app.listen(port, () => {

	console.log(`listening on port ${port}`);

});