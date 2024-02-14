const express = require('express')
const router = express.Router();
const firebase_admin_config = require("../ServiceAccount.js");
const firebase = require("firebase-admin");
firebase.initializeApp({
    credential:firebase.credential.cert(firebase_admin_config) ,
    databaseURL : "https://fir-authentication-f4672-default-rtdb.firebaseio.com/"
})

const auth = firebase.auth();
router.get('/getUsers', async (req, res) => {
    try {
        const userRecords = await auth.listUsers();
        const users = userRecords.users.map((user) => ({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            dp:user.photoURL
            // Add any additional user properties you need
        }));
        // let user = users
        res.json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send('Internal Server Error');
    }
});
  // get user by id 
router.get('/getUser/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const userRecord = await auth.getUser(userId);
       
      const user = {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        dp: userRecord.photoURL,
        // Add any additional user properties you need
      };
  
      res.json(user);
    } catch (error) {
    //   console.error('Error retrieving user:', error);
      res.status(404).send('User not found');
    }
  }); 

module.exports = router ; 