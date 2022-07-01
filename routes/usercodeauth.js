const router = require("express").Router();
const code_User = require("../models/codeUser")
const User = require("../models/User")
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken")
const referralCodeGenerator =  require ('referral-code-generator')
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ethers = require("ethers")



// REGISTER
router.post("/codeuserregister", async (req, res) => {

    
    let sig = req.body.sig
    const recoveredAddress = await ethers.utils.verifyMessage(req.body.link,sig)
        
    console.log("recover" , recoveredAddress)

    // console.log(sig)
    if(recoveredAddress === req.body.address) {

        const newUser = new code_User({
            username: req.body.username,
            address: req.body.address,
            link: req.body.link
        });
        
    
        try{

            const user = await User.find({refferal: {$elemMatch:{link:req.body.link}}})
        if(user !== null) {
            user.map(async (arr) => {
               let referalInfo = arr.refferal.filter((obj) => {
                return obj.link === req.body.link
                
               })
               referalInfo = referalInfo[0]
               console.log(referalInfo._id)

               if(referalInfo.address === null){
                const savedUser = await newUser.save();
                res.status(201).json(savedUser);
               }
               else{
                   res.json("User Code Expired")
               }

               
            })

        }


            // const savedUser = await newUser.save();
            // res.status(201).json(savedUser);
            
        }
        catch(e) {
            res.status(500).json(e)
        }
    }

    else{
        res.status(500).json(e)

    }
    

   
})

router.post("/getcodeuser", async (req, res) => {

    
    try{
        console.log(req.body.address)
        const user = await code_User.findOne({address: req.body.address})
        if(user !== null){
            res.json(user)
        }else{
            res.json("null")
        }
        
        
        
    }
    catch(e){
        console.log("error",e)
    }
    

   
})

module.exports = router