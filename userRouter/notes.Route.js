const express = require("express");
const { NoteModel } = require("../models/notes.model");
const noteroute = express.Router();

noteroute.get("/", async(req, res) => {
    let data=await NoteModel.find()
  res.send({"msg":data})
});

noteroute.post("/create", async(req,res)=>{
    const payload={titel,note,catagory,userId}=req.body

    try{
let NewNote=await new NoteModel(payload)
await NewNote.save()
res.send({"msg":"new note have been added successfully"})
    }
    catch(error){
        console.log(error)
        res.send({"msg":"error while posting new note"})
    }
});


noteroute.patch('/update/:id', async(req,res)=>{
    const payload={titel,note,catagory, userId}=req.body
const ID=req.params.id

//update the route which have been created by the user only
//by comparing we can get there
//we can comapre the id of the user who is making the del request with the Id present in the notes schema

const note=await NoteModel.findOne({_id:ID})
//how can we get the user id in that particular documnet
const user_in_note=note.userId
const user_id_in_doc=req.body.userId
console.log(user_id_in_doc)
try{
    //if(userId  who is making request=== user id in that particular note)

    if(user_id_in_doc!==user_in_note){
        res.send({"msg":"you are not authorised to make change in this doc"})
    }else{

        let data=await  NoteModel.findByIdAndUpdate({_id:ID},payload)
        await data.save()
        console.log(data)
        
        res.send(data)
    }
    }
    catch(err){
        console.log(err)
        res.send({"msg":"cannot patch some problem"})
    }
})

noteroute.delete("/delete/:id", async(req,res)=>{
    const ID=req.params.id;
    let note=await NoteModel.findByIdAndDelete({_id:ID})
    const user_in_note=note.userId
    const user_id_in_doc=req.body.userId
   
     try{

        if(user_id_in_doc!==user_in_note){
            res.send({"msg":"you are not authorised to make change in this doc"})
        }else{
    
let data=await NoteModel.findByIdAndDelete({_id:ID})
res.send({"msg":`item with ${ID} deleted successfully`})
           
        }


     }catch(err){
        console.log(err)
        res.send({"msg":"cannot del the item"})
     }
})


module.exports={
    noteroute
}