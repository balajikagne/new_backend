const express=require('express');
const router =express.Router();
const User=require("../mongocom/userModel");

router.post("/register",(req,res)=>{
    const {name,mobNumber,password}=req.body
    const newUser= new User({name,mobNumber,password})

    try {
        newUser.save()
        res.send('User Registered successfully')
    }
    catch(error)
    {
        return res.status(400).json({message:error})
    }
});

router.post("/login",async(req,res)=>{
    const {mobNumber,password}=req.body
    try{
        const user =await User.find({mobNumber,password})

        if (user.length>0){
            const currentUser={
                name:user[0].name,
                mobNumber:user[0].mobNumber,
                isAdmin:user[0].isAdmin,
                _id:user[0]._id
            }
            res.send(currentUser);
        }
        else{
            return res.status(400).json({message :'User Login Failed'});
        }
    }catch(error)
    {
        return res.status(400).json({massage:'Something went wrong'});
    }
})

// router.get("/getallusers", async (req,res)=>{
//     try{
//         const users=User.find({})
//         res.status(200).send(users);
//     }
//     catch(error){
//         res.status(404).json({message:error.stack})
//     }
// })
module.exports=router;
