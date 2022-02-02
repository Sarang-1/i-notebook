const express = require("express");
const User = require("../models/User");
const router = express.Router();

// using express-validator to validate the input fields
const { body, validationResult } = require("express-validator");

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const jwt_token = process.env.JWT_TOKEN

// creating a User using POST 
router.post(
  "/createuser",
  // adding validators to the body fields
  body("email", "Please enter a valid email").isEmail(),
  body("name", "Name should be atleast 3 characters long").isLength({ min: 3 }),
  body("password", "Password should be of atleast 5 characters").isLength({
    min: 5,
  }),
  async (req, res) => {
    // checking if user credentials enetered are valid or not
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // checking if a user with the same email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);

      // entering the credentials to the user indexes made in User.js
      user = await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
      });

      const data = {
        user:{
          id: user.id
        }
      }

      const authtoken = jwt.sign(data,jwt_token);

      // displaying the user in result area
      res.json({authtoken});


    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);


// Authenticating a user using POST 

router.post(
  "/login",
  // adding validators to the body fields
  body("email", "Please enter a valid email").isEmail(),
  body("password", "Password is required").exists(),
  async (req, res) => {
    console.log(jwt_token)

    // checking if user credentials enetered are valid or not
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;

    try {
      let user = await User.findOne({email});

      if(!user){
        return res.status(400).json({error: 'Please try to login with correct credentials'});
      }

      const passwordCompare = await bcrypt.compare(password,user.password);

      if(!passwordCompare){
        return res.status(400).json({error: 'Please try to login with correct credentials'});
      }

      const data = {
        user:{
          id: user.id
        }
      }

      const authtoken = jwt.sign(data,jwt_token);

      // displaying the user in result area
      res.json({authtoken});

    } catch (error) {
      
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  })
    

module.exports = router;
