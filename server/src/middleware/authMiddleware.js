import jwt from "jsonwebtoken"

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" })
  }

  try {
    const secret = process.env.JWT_SECRET || "fallback_development_secret"
    const decoded = jwt.verify(token, secret)
    req.userId = decoded.userId
    next()
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" })
  }
}
export { authenticateToken }
