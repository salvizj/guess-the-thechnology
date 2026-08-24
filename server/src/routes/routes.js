const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const authController = require("../controllers/authController")

router.get("/users/:id", userController.getUser)
router.post("/login", authController.postLogin)
router.post("/register", authController.postRegister)
module.exports = router
