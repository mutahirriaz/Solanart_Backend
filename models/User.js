const { type } = require("express/lib/response");
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        username: {type: String, required : true, unique: true},
        address: {type: String, required: true, unique: true},
        link: [
            {
                link: {type: String},
                address: {type: String, default: null},
            }
        ],
        // link: [ {link: {type:String},address:{type:String, default:null}}],
        // refferal: [ {link: {type:String},address:{type:String, default:null}, value: {type: Number, default: 0.2}}, {link: {type: String, },address:{type:String, default: null}, value: {type: Number, default: 0.1}}, {link: {type: String, },address:{type:String, defalult: null}, value: {type: Number, default: 0.1}}, {link: {type: String, },address:{type:String, defalult: null}, value: {type: Number, default: 0.5}}, {link: {type: String, },address:{type:String, defalult: null}, value: {type: Number, default: 0.5}}]
        
    },
    {timestamps : true} 
);

module.exports =  mongoose.model("User", UserSchema);