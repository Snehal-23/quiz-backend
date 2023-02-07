const express = require("express");

const router = express.Router();

const auth = require("../helpers/jwt");

const quizController = require("../controllers/quiz");

//GET all quiz
router.get("/", auth.optional, quizController.getAllQuiz);

router.get("/:id", auth.optional, quizController.getQuiz);

//post quiz
router.post("/addQuestion", auth.optional, quizController.postQuestion);

//post quiz
router.post("/addQuiz", auth.optional, quizController.postQuiz);

//delete quiz
router.post("/delete/:id", auth.optional, quizController.deleteQuiz);

module.exports = router;
