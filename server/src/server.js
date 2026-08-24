const express = require("express")
const path = require("path")
const apiRoutes = require("./routes/routes")
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use("/api", apiRoutes)

const clientBuildPath = path.resolve(__dirname, "../../client/build/client")

app.use(express.static(clientBuildPath))

app.get("/*splat", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"))
})

module.exports = app
