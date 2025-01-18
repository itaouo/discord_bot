const fs = require('fs-extra')
const path = require('path')

require('dotenv').config()
const COMMAND_FOLDER_PATH = process.env.COMMAND_FOLDER_PATH

const writeFile = async (filePath, content) => {
  try {
    await fs.ensureDir(path.dirname(filePath))
    await fs.writeFile(filePath, content, "utf8")

  } catch (error) {
    console.log('Write file error: ' + error.message)
    return false
  }
  return true
}
  
const readFile = async (filePath) => {
  try {
    return await fs.readFileSync(filePath, 'utf8')

  } catch (error) {
    console.log('Read file error: ' + error.message)
    return false
  }
}

const listToString = (list) => {
    let content = ""
    list.forEach(element => {
        content += element.toString() + '\n'
    })
    return content
}

const stringToList = (content) => {
  if(content === "") { return [] }
    return content.split('\n').filter(item => item.trim() !== '')
}

const listAllCommands = async () => {
  if (!await fs.exists(COMMAND_FOLDER_PATH)) { console.error('Folder not existed.') }

  const files = await fs.readdir(COMMAND_FOLDER_PATH)
  return files
}

module.exports = [writeFile, readFile, listToString, stringToList, listAllCommands]