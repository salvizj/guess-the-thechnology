import jwt from "jsonwebtoken"

export const postRegister = async (req, res) => {
  const { email, password } = req.body

  // 1. Validate input and check if user exists
  // 2. Hash password and save user to database
  const newUser = { id: "456", email } // Mock saved user

  // 3. Generate token
  const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  })

  // 4. Return response (Cookie or Bearer token)
  res.cookie("token", token, { httpOnly: true, sameSite: "strict" })
  return res.status(201).json({ message: "User registered successfully" })
}

export const postLogin = async (req, res) => {
  const { email, password } = req.body

  // 1. Find user and verify password hash
  const user = { id: "456", email } // Mock verified user

  // 2. Generate token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  })

  // 3. Return response
  res.cookie("token", token, { httpOnly: true, sameSite: "strict" })
  return res.status(200).json({ message: "Logged in successfully" })
}
