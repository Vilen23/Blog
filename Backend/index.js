const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.route");
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error'
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})

app.listen(3000);
