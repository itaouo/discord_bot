const sqlite3 = require('sqlite3').verbose()

require('dotenv').config()
const NEW_WEATHER_SPOTS_SAVE = process.env.NEW_WEATHER_SPOTS_SAVE

const db = new sqlite3.Database(NEW_WEATHER_SPOTS_SAVE, (err) => {
    if (err) {
        console.error('Error opening database:', err.message)
    } else {
        console.log('Connected to SQLite database.')
    }
})

module.exports = db