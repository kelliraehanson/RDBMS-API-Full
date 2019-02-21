
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Kelli Rae Hanson', cohort_id: '1' },
        { name: 'Marissa LaRocca', cohort_id: '2' },
        { name: 'CJ Hanson', cohort_id: '2' },
        { name: 'Sara Peterson', cohort_id: '2' },
        { name: 'Meg Davis', cohort_id: '3' },
        { name: 'Zack Akers', cohort_id: '4' },
        { name: 'Greg Smith', cohort_id: '5' },
        { name: 'Molly Harrison', cohort_id: '6' },
      ]);
    });
};
