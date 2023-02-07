const express = require("express");
const app = express();
const mongoose = require("mongoose");

const Question = require("../models/question");
const Quiz = require("../models/quiz");

exports.postQuestion = async (req, res) => {
  const question = new Question({
    question: req.body.question,
    noOfOptions: req.body.noOfOptions,
    options: req.body.options,
    correctOptions: req.body.correctOptions,
  });
  question
    .save()
    .then((createdQuestion) => {
      res
        .status(201)
        .json({ data: createdQuestion, message: "Success", status: 1 });
    })
    .catch((err) => {
      res.status(200).json({
        message: err,
        status: 0,
      });
    });
};

exports.getAllQuiz = async (req, res) => {
  let filter = {};
  const userId = req.query.user;
  // //ways to filter acc to user : http://localhost:3000/api/v1/quiz/?user=
  if (userId) {
    filter = { user: userId };
  }

  const quizList = await Quiz.find(filter).populate("questions");
  if (!quizList) {
    res.json({ status: 0, message: "No data found" });
  } else {
    res.json({ data: quizList, status: 1, message: "success" });
  }
};

exports.postQuiz = (req, res) => {
  //   const category = Category.findById(req.body.category);
  //   if (!category) {
  //     res.status(400).send({ message: "Invalid category", status: 0 });
  //   }

  const quiz = new Quiz({
    quizId: req.body.quizId,
    questions: req.body.questions,
    user: req.body.user,
    count: req.body.count,
  });
  quiz
    .save()
    .then((createdQuiz) => {
      res
        .status(201)
        .json({ data: createdQuiz, message: "Success", status: 1 });
    })
    .catch((err) => {
      res.status(200).json({
        message: err,
        status: 0,
      });
    });
};

exports.getQuiz = (req, res) => {
  const id = req.params.id;
  Quiz.find({ quizId: id })
    .select("")
    .populate("questions")
    .then((quiz) => {
      res.status(200).json({ data: quiz, message: "success", status: 1 });
    })
    .catch((err) => {
      res.json({ status: 0, message: err });
    });
};

exports.deleteQuiz = (req, res) => {
  let id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(200).send({ message: "Invalid product id", status: 0 });
  }

  Quiz.findByIdAndRemove(id)
    .then((deletedProduct) => {
      res.status(200).send({ message: "Quiz deleted successfully", status: 1 });
    })
    .catch((err) => {
      res.status(200).send({ message: err, status: 0 });
    });
};
