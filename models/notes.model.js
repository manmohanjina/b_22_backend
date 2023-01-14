const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
    titel:String,
    note:String,
    catagory:String,
    author:String,
    userId:String
});

const NoteModel=mongoose.model('note', notesSchema)

module.exports={
    NoteModel
}
