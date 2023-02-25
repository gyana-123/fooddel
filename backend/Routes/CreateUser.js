const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const jwtsecret = "mynamegyanshree123loveyoumumumaadeota"

router.post('/createuser',[
    body('name').isLength({ min: 5 }),
    body('email').isEmail(),
// password must be at least 5 chars long
    body('password').isLength({ min: 5 })]
    , async(req, res)=>{
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });}

      const salt = await bcrypt.genSalt(10);
      const setPassword = await bcrypt.hash(req.body.password, salt)


try {
    await User.create({
        name: req.body.name,
        email: req.body.email,
        location: req.body.location,
        password: setPassword
    })

    res.json({
        sucess: true
    })
    
} catch (error) {
    console.log(error);
    res.json({
        sucess: false
    })
    
}

})

router.post('/loginuser',[ 
    body('email').isEmail(),
// password must be at least 5 chars long
    body('password').isLength({ min: 5 })],
   async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });}
       let email = req.body.email;
try {
    let userData= await User.findOne({ email});
    if(!userData){
        return res.status(400).json({ errors: "loggin error" });
    }
    

    const pwdcompare = await bcrypt.compare(req.body.password , userData.password);
    if(!pwdcompare){
        return res.status(400).json({ errors: "loggin error ! password" });

    }

    const data={
        user:{
            id: userData.id
        }
    }
    const authToken = jwt.sign(data, jwtsecret)
    res.json({
        sucess: true , 
        authToken : authToken
    })
    
} catch (error) {
    console.log(error);
    res.json({
        sucess: false
    })
    
}

})


module.exports = router; 