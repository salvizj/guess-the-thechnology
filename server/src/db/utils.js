import db from "./db.js"

export const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (error) {
      if (error) reject(error)
      else resolve(this)
    })
  })
}

export const dbGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (error, row) => {
      if (error) reject(error)
      else resolve(row)
    })
  })
}
