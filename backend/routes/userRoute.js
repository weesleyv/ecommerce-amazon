import express from "express";
import User from "../models/User";
import { getToken, isAuth } from "../utils";

const router = express.Router();

router.post("/signin", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    res.send({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: getToken(user),
    });
  } else {
    res.status(401).send({ errorMsg: "Invalid Email or Password" });
  }
});

router.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const newUser = await user.save();

  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } else {
      res.status(401).send({message: "invalid user data"})
  }
});

router.put("/:id", isAuth, async (req,res) => {
  const userId = req.params.id
  const user = await User.findById(userId)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.password = req.body.password || user.password
    const updatedUser = await user.save()
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
    })
  } else {
    res.status(404).send({message: "User Not Found"})
  }
})

router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "Vitalij",
      email: "prokofjev4@gmail.com",
      password: "1234",
      isAdmin: true,
    });
    const newUser = await user.save();
    console.log(newUser);
    res.send(newUser);
  } catch (error) {
    res.send({ message: error.message });
  }
});

export default router;
