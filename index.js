const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

// GET
server.get('/api/cohorts', (req, res) => {
	db.from('cohorts')
		.then(list => {
			res.status(200).json(list);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`\nrunning on ${port}\n`));