const client = require("./client");
const bcrypt = require('bcrypt');

// database functions

// user functions
async function createUser({ username, password }) {
  const user = await getUserByUsername(username)
  if (user) {
    throw new Error("There is already an account with this username")
  }
  if (password.length < 8) {
    throw new Error("Password must be 8 characters or more")
  }  
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  const {rows:[newUser] } = await client.query(
    `INSERT INTO users(username, password) VALUES($1, $2) RETURNING *;`, [username, hashedPassword]
  )
  return newUser;
}

async function getUser({ username, password }) {
  const user = await getUserByUsername(username);
  if (!user){
    throw new Error("There is no account with this username")
  }
  const hashedPassword = user.password;

  let passwordsMatch = await bcrypt.compare(password, hashedPassword);
  if (passwordsMatch) {
    return user;
  } else {
    throw new Error("Username and Password do not match")
  }
}

async function getUserById(userId) {
  const user = await client.query(
    `SELECT id, username FROM users WHERE id=${userId};`
  )
    return user;
}

async function getUserByUsername(userName) {
  const user = await client.query(
    `SELECT * FROM users WHERE username='${userName}';`
  )
    console.log(user);
    return user;
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
