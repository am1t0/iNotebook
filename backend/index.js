const connectToMongo = require('./db');
const mongoose = require('mongoose');
const express = require('express')
const app = express()
const port = 3000
connectToMongo()

app.get('/', (req, res) => {
  res.send('Hello Amit!')
})
// Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})