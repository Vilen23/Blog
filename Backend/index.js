const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.route");
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.route");

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use('/api/post',postRoutes);

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
