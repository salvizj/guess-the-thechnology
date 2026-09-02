import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { eq, or } from "drizzle-orm"
import { db } from "../db/db.js"
import { users } from "../db/schema.js"

export const postRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const existingUser = db
      .select({ id: users.id })
      .from(users)
      .where(or(eq(users.email, email), eq(users.username, username)))
      .get()

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const [newUser] = db
      .insert(users)
      .values({
        username,
        email,
        passwordHash: hashedPassword,
      })
      .returning({ id: users.id, username: users.username, email: users.email })
      .get()

    const secret = process.env.JWT_SECRET || "fallback_development_secret"
    const token = jwt.sign({ userId: newUser.id }, secret, {
      expiresIn: "1h",
    })

    res.cookie("JWT", token, { httpOnly: true, sameSite: "strict" })
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    })
  } catch (error) {
    console.error("Registration Error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const user = db.select().from(users).where(eq(users.email, email)).get()

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const secret = process.env.JWT_SECRET || "fallback_development_secret"
    const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, secret, {
      expiresIn: "1h",
    })

    res.cookie("JWT", token, { httpOnly: true, sameSite: "strict" })
    return res.status(200).json({
      message: "Logged in successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    })
  } catch (error) {
    console.error("Login Error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export const postLogout = (req, res) => {
  res.clearCookie("JWT", { httpOnly: true, sameSite: "strict" })
  return res.status(200).json({ message: "Logged out successfully" })
}

export default { postRegister, postLogin, postLogout }
