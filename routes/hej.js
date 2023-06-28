const express = require('express');
const router = express.Router();

router.get('/printhej',(req,res)=>{
    res.send('hej');
})
 
module.exports = router 
