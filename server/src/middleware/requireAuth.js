import jwt from "jsonwebtoken"

const requireAuth = (req, res, next) => {
  const token = req.cookies?.JWT

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" })
  }

  const secret = process.env.JWT_SECRET
  if (!secret) {
    console.error("CRITICAL: JWT_SECRET missing.")
    return res.status(500).json({ message: "Server configuration error" })
  }

  try {
    const decoded = jwt.verify(token, secret)

    if (typeof decoded !== "object" || !decoded || !("userId" in decoded)) {
      return res.status(403).json({ message: "Invalid token structure" })
    }

    req.userId = decoded.userId
    next()
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" })
  }
}
export { requireAuth }
