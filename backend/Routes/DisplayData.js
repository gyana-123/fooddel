const express = require('express');
const router = express.Router();
 

router.post('/displayitems', (req,res)=>{

    try{
        // console.log(global.food_items)
        res.send([global.food_items,global.food_category])
    } catch(error){
        res.send("server error");
    }
})




module.exports = router; 