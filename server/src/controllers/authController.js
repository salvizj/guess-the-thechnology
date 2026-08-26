import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { dbGet, dbRun } from "../db/utils.js"

export const postRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }
    const existingUser = await dbGet(
      "SELECT id FROM users WHERE email = ? OR username = ?",
      [email, username],
    )
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await dbRun(
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
    )
    const secret = process.env.JWT_SECRET || "fallback_development_secret"
    const token = jwt.sign({ userId: user.lastID }, secret, {
      expiresIn: "1h",
    })

    res.cookie("JWT", token, { httpOnly: true, sameSite: "strict" })
    return res.status(201).json({
      message: "User registered successfully",
      user: { id: user.lastID, username, email },
    })
  } catch (err) {
    console.error("Registration Error:", err)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }
    const user = await dbGet("SELECT * FROM users WHERE email = ?", [email])
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" })
    }
    const secret = process.env.JWT_SECRET || "fallback_development_secret"
    const token = jwt.sign({ userId: user.id }, secret, {
      expiresIn: "1h",
    })

    res.cookie("JWT", token, { httpOnly: true, sameSite: "strict" })
    return res.status(200).json({
      message: "Logged in successfully",
      user: { id: user.id, username: user.username, email: user.email },
    })
  } catch (err) {
    console.error("Login Error:", err)
    return res.status(500).json({ message: "Internal server error" })
  }
}

const postLogout = (req, res) => {
  res.clearCookie("JWT", { httpOnly: true, sameSite: "strict" })
  return res.status(200).json({ message: "Logged out successfully" })
}

export default { postRegister, postLogin, postLogout }
