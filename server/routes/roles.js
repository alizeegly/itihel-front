const router = require('express').Router()
const Role = require("../models/Users/Role")

/**
 * @method - GET
 * @param - /
 * @description - Get All
 */
router.get("/", async (req, res) => {
    try{
        const roles = await Role.find()
        res.status(200).json(roles)
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router