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

server.get('/api/cohorts/:id', (req, res) => {
	const cohortId = req.params.id;
	db.from('cohorts')
		.where({ id: cohortId })
		.then(cohort => {
			res.status(200).json(cohort);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

server.get('/api/cohorts/:id/students', (req, res) => {
    const {id} = req.params
  db('students').where('cohort_id', id)
    .then(rows => {
      if(rows.length !== 0) {
        res.json(rows)
      } else {
        res
          .status(404)
          .json({err: 'No students in this cohort'})
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({err: 'Was not able to find this student'})
    })
})

// POST

server.post('/api/cohorts', (req, res) => {
	const cohort = req.body;
	db('cohorts')
		.insert(cohort)
		.then(ids => {
			res.status(201).json(ids);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

// DELETE

server.delete('/api/cohorts/:id/', (req, res) => {
	const deleteCohort = req.params.id;
	db('cohorts')
		.where({ id: deleteCohort })
		.del()
		.then(numDeleted => {
			res.status(200).json(numDeleted);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

// PUT 

server.put('/api/cohorts/:id', async (req, res) => {
    try {
      const count = await db('cohorts')
        .where({ id: req.params.id })
        .update(req.body);
  
      if (count > 0) {
        const role = await db('cohorts')
          .where({ id: req.params.id })
          .first();
  
        res.status(200).json(role);
      } else {
        res.status(404).json({ message: 'Records not found' });
      }
    } catch (error) {}
  });

// ========================== STUDENTS

// GET

server.get('/api/students', (req, res) => {
	db.from('students')
		.then(list => {
			res.status(200).json(list);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

server.get('/api/students/:id', (req, res) => {
	const student = req.params.id;
	db.from('students')
		.where({ id: student })
		.then(cohort => {
			res.status(200).json(cohort);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

// POST

server.post('/api/students', (req, res) => {
	const studentNew = req.body;
	db('cohorts')
		.insert(studentNew)
		.then(ids => {
			res.status(201).json(ids);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

// DELETE

server.delete('/api/students/:id', async (req, res) => {
    try {
      const count = await db('students')
        .where({ id: req.params.id })
        .del();
  
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Records not found' });
      }
    } catch (error) {}
  });


// PUT

server.put('/api/students/:id', async (req, res) => {
    try {
      const count = await db('students')
        .where({ id: req.params.id })
        .update(req.body);
  
      if (count > 0) {
        const role = await db('students')
          .where({ id: req.params.id })
          .first();
  
        res.status(200).json(role);
      } else {
        res.status(404).json({ message: 'Records not found' });
      }
    } catch (error) {}
  });













const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`\nrunning on ${port}\n`));