const router = require('express').Router()
const Note = require("../../models/Notes/Note")

/**
 * @method - POST
 * @param - /
 * @description - Note create
 */
// router.post("/", async (req, res) => {
//     const newNote = new Note(req.body)
//     try{
//         const savedNote = await newNote.save()
//         Course.findByIdAndUpdate(req.body.course_id, { note_id: newNote._id },
//             function (err, docs) {
//             if (err){
//                 console.log(err)
//             }
//             else{
//                 console.log("Updated User : ", docs);
//             }
//         })
//         res.status(200).json(newNote)
//     }catch(err){
//         res.status(500).json(err)
//     }
// })

/**
 * @method - PUT
 * @param - /:id
 * @description - Note update
 */
router.put("/:id", async (req, res) => {
    try{
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updatedNote)
    }catch(err){
        res.status(500).json(err)
    }
})

/**
 * @method - DELETE
 * @param - /:id
 * @description - Note delete
 */
router.delete("/:id", async (req, res) => {
    try{
        await Note.findByIdAndDelete(req.params.id)
        res.status(200).json("The note has been deleted")
    } catch(err) {
        res.status(500).json(err)
    }
})

/**
 * @method - GET
 * @param - /find/:id
 * @description - Note Get One
 */
router.get("/find/:id", async (req, res) => {
    try{
        const note = await Note.findById(req.params.id)
        res.status(200).json(note)
    } catch(err) {
        res.status(500).json(err)
    }
})

/**
 * @method - GET
 * @param - /
 * @description - Note Get All
 */
router.get("/", async (req, res) => {
    try{
        const notes = await Note.find()
        res.status(200).json(notes)
    } catch(err) {
        res.status(500).json(err)
    }
})


module.exports = router