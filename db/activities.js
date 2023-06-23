const client = require('./client');

// database functions
async function createActivity({ name, description }) {
  const newActivity = await client.query(
    `INSERT INTO activities (name, description) VALUES ('${name}','${description}')`
  )
  return newActivity;
 }

async function getAllActivities() {
  const { rows } = await client.query(
    `SELECT * FROM activities;`
  )
  return rows;
  // select and return an array of all activities
}

async function getActivityById(id) {
  const activity = await client.query(
    `SELECT * FROM activities WHERE id=${id};`
  )
  return activity;
}

async function getActivityByName(name) {
  const activity = await client.query(
  `SELECT * FROM activities WHERE name='${name}';`
  )
  return activity;
}

// used as a helper inside db/routines.js
async function attachActivitiesToRoutines(routines) {

}


async function updateActivity({ id, name, description }) {
  const activity = await client.query(
    `UPDATE activities 
    SET name='${name}', description= '${description}'
    WHERE id = ${id};`
  )
  return activity;
  // don't try to update the id
  // do update the name and description
  // return the updated activity
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
