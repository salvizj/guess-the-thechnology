import express from "express"
import userController from "../controllers/userController.js"
import authController from "../controllers/authController.js"
import { authenticateToken } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/users/:id", userController.getUser)
router.post("/auth/login", authController.postLogin)
router.post("/auth/register", authController.postRegister)
router.post("/auth/logout", authController.postLogout)

router.get("/auth/verify", authenticateToken, (req, res) => {
  res.status(200).json({ valid: true })
})
export default router
