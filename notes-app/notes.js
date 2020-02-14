const fs = require('fs')
const chalk = require('chalk')

const getNotes = function(){
    return 'Your notes...'
}

const addNote = function (title,body){
    const notes = loadNotes()
    const duplacteNotes = notes.filter(function (note) {
        return note.title === title
    })

    if (duplacteNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New Note Added!')
    } else {
        console.log('Note title not available!')
    }
}

const removeNote = function(title){
    const notes = loadNotes()
    const notesToKeep = notes.filter(function (note){
        return note.title !== title
    })
    
    if (notes.length > notesToKeep.length){
        console.log(chalk.green.inverse('Note Removed!'))
        saveNotes (notesToKeep)
    } else {
        console.log(chalk.red.inverse('Note Not Found!'))
    }
    
}

const saveNotes = function (notes){
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function (){
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
}
