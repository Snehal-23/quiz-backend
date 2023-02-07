const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.getUsers = async (req, res) => {
  const userList = await User.find().select("-passwordHash");
  if (!userList) {
    res.json({ success: false, message: "No data found" });
  } else {
    res.json({ data: userList, message: "success", status: 1 });
  }
};

exports.getUser = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .select("-passwordHash")
    .then((user) => {
      res.status(200).json({ data: user, message: "success", status: 1 });
    })
    .catch((err) => {
      res.json({ status: 0, message: err });
    });
};

exports.postUser = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
  });
  user
    .save()
    .then((createdUser) => {
      res
        .status(201)
        .json({ data: createdUser, message: "Success", status: 1 });
    })
    .catch((err) => {
      res.status(200).json({
        message: err,
        status: 0,
      });
    });
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(200).json({ status: 0, message: "The user not found" });
    return;
  }
  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        user: user.id,
      },
      secret,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      token: token,
      user: user.email,
      status: 1,
      message: "User authenticated",
    });
    return;
  } else {
    res.status(200).json({ status: 0, message: "wrong credentials" });
    return;
  }
};

exports.countUsers = (req, res) => {
  User.countDocuments()
    .then((count) => {
      res.status(200).json({ data: count, message: "success", status: 1 });
    })
    .catch((err) => {
      res.status(200).send({ message: err, status: 0 });
    });
};

exports.deleteUser = (req, res) => {
  let id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(200).send({ message: "Invalid product id", status: 0 });
  }
  User.findByIdAndRemove(id)
    .then((deletedUser) => {
      res.status(200).send({ message: "User deleted successfully", status: 1 });
    })
    .catch((err) => {
      res.status(200).send({ message: err, status: 0 });
    });
};

// gini pwd:1287e4398
// wendy@gmail.com:"abcd1234"
