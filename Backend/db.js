const { configDotenv } = require('dotenv')
const mongoose = require('mongoose')
configDotenv();
mongoose.connect(process.env.MONGO)