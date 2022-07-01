const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var cors = require('cors')
// const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const userCodeAuthRoute = require("./routes/usercodeauth")


dotenv.config();

// console.log(process.env.MONGO_URL)

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("DBConnection Sufccessful")
}).catch((err) => {console.log(err)});

app.use(cors())

app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/user", userCodeAuthRoute)

app.listen(process.env.PORT || 4000, () => {
    console.log("Backend")
})