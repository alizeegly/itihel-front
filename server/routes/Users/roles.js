const router = require('express').Router()
const Role = require("../../models/Users/Role")

/**
 * @method - POST
 * @param - /
 * @description - Role create
 */
 router.post("/", async (req, res) => {
    const newRole = new Role(req.body)
    try{
        if(req.session.isAuth && req.session.isAdmin && req.session.user.pseudo === "SUPER_ADMIN"){
            const savedRole = await newRole.save()
            res.status(201).json(savedRole)
        } else {
            res.status(500).json({"error": "connection-error"})
        }
    }catch(err){
        res.status(500).json(err)
    }
})

/**
 * @method - PUT
 * @param - /:id
 * @description - Role update
 */
 router.put("/:id", async (req, res) => {
    try{
        if(req.session.isAuth && req.session.isAdmin && req.session.user.pseudo === "SUPER_ADMIN"){
            const updatedRole = await Role.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
            res.status(200).json(updatedRole)
        } else {
            res.status(500).json({"error": "connection-error"})
        }
    }catch(err){
        res.status(500).json(err)
    }
})

/**
 * @method - DELETE
 * @param - /:id
 * @description - Role delete
 */
router.delete("/:id", async (req, res) => {
    try{
        if(req.session.isAuth && req.session.isAdmin && req.session.user.pseudo === "SUPER_ADMIN"){
            await Role.findByIdAndDelete(req.params.id)
            res.status(200).json("The role has been deleted")
        } else {
            res.status(500).json({"error": "connection-error"})
        }
    } catch(err) {
        res.status(500).json(err)
    }
})

/**
 * @method - GET
 * @param - /find/:id
 * @description - Get One
 */
router.get("/find/:id", async (req, res) => {
    try{
        if(req.session.isAuth){
            const role = await Role.findById(req.params.id)
            res.status(200).json(role)
        } else {
            res.status(500).json({"error": "connection-error"})
        }
    } catch(err) {
        res.status(500).json(err)
    }
})

/**
 * @method - GET
 * @param - /
 * @description - Get All
 */
router.get("/", async (req, res) => {
    try{
        if(req.session.isAuth){
            const roles = await Role.find()
            res.status(200).json(roles)
        } else {
            res.status(500).json({"error": "connection-error"})
        }
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router