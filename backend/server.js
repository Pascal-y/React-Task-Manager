const dotenv = require("dotenv").config()
const express = require("express")
const connectDB = require("./config/connectDB")
const mongoose = require("mongoose")
const Task = require("./model/taskModel")
const taskRoute = require("./routes/taskRoutes")
const cors = require("cors")

const app = express()

//Route to Home Page
app.get("/", (req, res)=>{
    res.send("<h1>Welcome To Home Page </h1>");
})

//MiddleWare
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(taskRoute)
app.use(cors())

//Port on which our server is running on
const PORT = process.env.PORT || 5000
//Starting the server only when the database has been connected option 1
const startserver = async ()=> {
    try {
        await connectDB();
        app.listen(PORT,() =>{
            console.log(`Server running on port: ${PORT} !!!`);
        })
    } catch (error) {
        console.log(error);
    }

}
startserver();

/* Name and password for mongoDB = mern1234
Conection string = mongodb+srv://mern1234:<password>@mernapp.mgsdhqd.mongodb.net/?retryWrites=true&w=majority */

//Option 2 connecting to server after DB connected
/*const mongoose =  require("mongoose.connect()=>")

mongoose.connect(process.env.MUNGO_URI)
.then(()=>{
    app.listen(PORT,() =>{
        connectDB();
            console.log(`Server running on port: ${PORT}!!!`);
        })
})
.catch((error)=> console.log(error))
*/