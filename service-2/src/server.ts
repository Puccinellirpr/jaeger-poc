import app from './app'

const PORT = process.env.PORT || 3332


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})