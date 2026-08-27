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

    if (
      typeof decoded !== "object" ||
      !decoded ||
      !("userId" in decoded) ||
      !("isAdmin" in decoded)
    ) {
      return res.status(403).json({ message: "Invalid token structure" })
    }

    req.userId = decoded.userId
    req.isAdmin = decoded.isAdmin
    next()
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" })
  }
}

const isAdmin = (req, res, next) => {
  if (!req.isAdmin) {
    return res
      .status(403)
      .json({ message: "Access denied. Admin privileges required." })
  }
  next()
}

export { requireAuth, isAdmin }
