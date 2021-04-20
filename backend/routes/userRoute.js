import express from "express";
import User from "../models/userModel";
import { getToken, isAuth } from "../util";

const router = express.Router();

router.put('/:id', isAuth, async (req, res) =>{
  const userId = req.params.id;
  const user = await User.findById(userId)
  if(user) {
    user.name = req.body.name || user.name;
    user.email = req.body || user.email;
    user.passsword = req.body.passsword || user.passsword;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser)
    })
  } else {
    res.status(404).send({message: 'User Not Found'})
  }
})

router.post('/signin', async(req, res) =>{
  const signinUser =  await USer.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if()
})