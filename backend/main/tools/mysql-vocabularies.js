require('dotenv').config()
const MYSQL_HOST = process.env.MYSQL_HOST
const MYSQL_USER = process.env.MYSQL_USER
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD

const mysql = require('mysql2/promise')

const fetchWords = async () => {
  try {
    const tableConnection = await mysql.createConnection({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: 'bot'
    })
    const query = `SELECT DISTINCT word FROM vocabularies`
    const [rows] = await tableConnection.execute(query)
    const wordsList = rows.map(row => row.word)

    await tableConnection.end()
    return wordsList
  } catch (err) {
    console.error('Failed to insert data: ', err)
  }
}

const fetchAllSentencesAndTranslates = async () => {
  try {
    const tableConnection = await mysql.createConnection({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: 'bot'
    })

    const query = 
    `SELECT sentence, sentence_translate AS sentenceTranslate
    FROM vocabularies
    WHERE sentence_translate != '';`
    const [rows] = await tableConnection.execute(query)

    await tableConnection.end()
    return rows
  } catch (err) {
    console.error('Failed to insert data: ', err)
  }
}

const insertWordData = async (word, partOfSpeech, definition, definitionTranslate, sentence, sentenceTranslate, familiarity) => {
  try {
    const tableConnection = await mysql.createConnection({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: 'bot'
    })
    const query = `
    INSERT INTO vocabularies (word, part_of_speech, definition, definition_translate, sentence, sentence_translate, familiarity)
    VALUES (?, ?, ?, ?, ?, ?, ?)`
    await tableConnection.execute(query, [word, partOfSpeech, definition, definitionTranslate, sentence, sentenceTranslate, familiarity])
    
    await tableConnection.end()
  } catch (err) {
    console.error('Failed to insert data: ', err)
  }
}

module.exports = { fetchWords, insertWordData, fetchAllSentencesAndTranslates }