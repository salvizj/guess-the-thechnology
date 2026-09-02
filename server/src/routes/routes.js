import express from "express"
import authController from "../controllers/authController.js"
import quizController from "../controllers/quizController.js"
import { requireAuth } from "../middleware/requireAuth.js"
import { requireAdmin } from "../middleware/requireAdmin.js"

const router = express.Router()

//Auth Routes
router.post("/auth/register", authController.postRegister)
router.post("/auth/login", authController.postLogin)
router.post("/auth/logout", requireAuth, authController.postLogout)
router.get("/auth/verify", requireAuth, (req, res) => {
  return res.status(200).json({
    isValid: true,
    userId: req.userId,
    isAdmin: req.isAdmin,
  })
})

//Public Quiz Routes
router.get("/quizzes", quizController.getQuizzes)
router.get("/quiz/:id", quizController.getQuizById)

//Admin-Protected Quiz Routes
router.post("/quiz", requireAuth, requireAdmin, quizController.postCreateQuiz)
router.put(
  "/quizzes/:id",
  requireAuth,
  requireAdmin,
  quizController.putUpdateQuiz,
)
router.delete(
  "/quizzes/:id",
  requireAuth,
  requireAdmin,
  quizController.deleteQuiz,
)
export default router
