const fs = require('fs-extra')
const path = require('path')

const writeFile = async (filePath, content) => {
  try {
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, content, "utf8")

  } catch (error) {
    console.log(error.message)
    return false
  }
  return true
}
  
const readFile = async (filePath) => {
  try {
    return await fs.readFileSync(filePath, 'utf8')

  } catch (error) {
    console.log(error.message)
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
    return content.split('\n').filter(item => item.trim() !== '');
}


module.exports = [writeFile, readFile, listToString, stringToList];