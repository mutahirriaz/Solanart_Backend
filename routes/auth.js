const router = require("express").Router();
const User = require("../models/User")
const referralCodeGenerator =  require ('referral-code-generator')
const ethers = require("ethers")



// REGISTER
router.post("/register", async (req, res) => {
    console.log(req.body)
    const link = {
        link: "https://solanart-trains.surge.sh/"+req.body.address,
        address: null
    }

    const newUser = new User({
        username: req.body.username,
        address: req.body.address,
        link: link
    });
    
    try{
        const savedUser = await newUser.save();

        let userData = savedUser.link[0]
                console.log(">>>",userData)
                let userLink = `https://solanart-trains.surge.sh/${userData._id}`
                const hello = await User.updateOne({"link._id":userData.id},{$set:{"link.$.link":userLink}});
                res.status(200).json(savedUser);
        
    }
    catch(e) {
        res.status(500).json(e)
    }

   
})

router.post("/finduser", async (req, res) =>{
    try{
        const user = await User.findOne({address: req.body.address})
        if(user !== null){
            res.json(user)
        }else{
            res.json("null")
        }

        
    }
    catch(e){
        console.log(e)
    }
})


// find user by object address
router.post("/findobjectaddress", async (req, res) =>{
    try{
        const user = await User.find({link: {$elemMatch:{address:req.body.address}}})
        // if(user !== null){
            res.status(200).json(user)
        // }
        console.log("user", user)

        
    }
    catch(e){
        console.log(e)
    }
})

// router.get("/delete", async (req, res) => {
//     try{
//         const user = await User.findOneAndDelete({link: "D0588392B0851682B1499124Q0777288W6181012S5437155U8750740O3698125"});
//         const user = await User.updateOfne({_id:"629ed691eca5ee6968d1fddb"}, {$pull: {link: "T5547402D4091284P1083500R1047195E5436356U7164292Y1978585J3317496"}})
//         console.log(user)
//     }
//     catch(e){
//         console.log(res.status(500).json(e))
//     }
// })

router.post("/unpaiduser",async(req,res)=> {
    try{
        console.log(req.body)
        const user = await User.find({link: {$elemMatch:{link:req.body.link}}})
        if(user !== null) {
            user.map(async (arr) => {
               let referalInfo = arr.link.filter((obj) => {
                return obj.link === req.body.link
                
               })
               referalInfo = referalInfo[0]
               console.log(referalInfo._id)
               

               if(referalInfo.address === null){
               const hello = await User.updateOne({"link._id":referalInfo.id},{$set:{"link.$.address":req.body.address}});
               }
               else{
                   res.json("User Code Expired")
               }

               
            })

        }


       
    }
    catch(e){
        res.json(e)
    }
});


// REGISTER

router.post("/codeuserregister", async (req, res) => {

    console.log(req.body)
    
    // let sig = req.body.sig
    // const recoveredAddress = await ethers.utils.verifyMessage(req.body.link,"registeruser")
    const link = {
        link: "https://solanart-trains.surge.sh/"+req.body.address,
        address: null
    }
    
    // if(recoveredAddress === req.body.address) {

        const newUser = new User({
            username: req.body.username,
            address: req.body.address,
            link: link
        });
        
    
        try{
            const user = await User.find({link: {$elemMatch:{link:req.body.identify}}})
            console.log("user", user)
        if(user !== null) {
            user.map(async (arr) => {
               let referalInfo = arr.link.filter((obj) => {
                console.log(obj)
                return obj
                
               })
               referalInfo = referalInfo[0]
               console.log("id",referalInfo)

               if(referalInfo.address === null){
                const savedUser = await newUser.save();

                let userData = savedUser.link[0]
                console.log(">>>",userData)
                let userLink = `https://solanart-trains.surge.sh/${userData._id}`
                const hello = await User.updateOne({"link._id":userData.id},{$set:{"link.$.link":userLink}});
                res.status(201).json(savedUser);
               }
               else{
                   res.json("User Code Expired")
               }

               
            })

        }

            
        }
        catch(e) {
            res.status(500).json(e)
        }
    
    

   
})

module.exports = router