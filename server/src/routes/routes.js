import express from "express"
import authController from "../controllers/authController.js"
import { requireAuth } from "../middleware/requireAuth.js"

const router = express.Router()

router.post("/auth/login", authController.postLogin)
router.post("/auth/register", authController.postRegister)

router.post("/auth/logout", requireAuth, authController.postLogout)
router.get("/auth/verify", requireAuth, (req, res) => {
  return res.status(200).json({
    isValid: true,
    userId: req.userId,
  })
})
export default router
