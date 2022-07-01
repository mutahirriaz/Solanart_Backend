const { type } = require("express/lib/response");
const mongoose = require("mongoose")

const codeUserSchema = new mongoose.Schema(
    {
        username: {type: String, required : true, unique: true},
        address: {type: String, required: true, unique: true},
        link : {type: String, required: true, unique: true}
        
    },
    {timestamps : true} 
);

module.exports =  mongoose.model("codeUser", codeUserSchema);