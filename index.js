const express = require('express')
const connectToDb = require('./db')
const cors = require('cors')
connectToDb()

const app = express();
const port = 5000;

app.use(express.json())
app.use(cors())

const authRoutes = require('./routes/auth')

app.use('/api/auth', authRoutes)

app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`)
})