const getUser = (req, res) => {
  const { id } = req.params
  res.json([{ id, username: "Alice", email: "alice@example.com" }])
}
export default { getUser }
