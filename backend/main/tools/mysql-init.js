require('dotenv').config()
const MYSQL_HOST = process.env.MYSQL_HOST
const MYSQL_USER = process.env.MYSQL_USER
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD

const mysql = require('mysql2/promise')

async function createDatabase() {
  try {
    const sqlConnection = await mysql.createConnection({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD
    })

    await sqlConnection.query('CREATE DATABASE IF NOT EXISTS bot')
    console.log("Create database success!")

    await sqlConnection.end()
  } catch (err) {
    console.error('Failed to create database: ', err)
  }
}

async function createTable() {
  try {
    const dbConnection = await mysql.createConnection({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: 'bot'
    })

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS vocabularies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        word VARCHAR(255) NOT NULL,
        part_of_speech VARCHAR(50) NOT NULL,
        definition TEXT NOT NULL,
        definition_translate TEXT,
        sentence TEXT,
        sentence_translate TEXT,
        familiarity INT DEFAULT 0
      );
    `
    await dbConnection.query(createTableQuery)
    console.log("Create table success!")

    await dbConnection.end()
  } catch (err) {
    console.error('Failed to create table: ', err)
  }
}

async function main() {
    await createDatabase()
    await createTable()
}

main()