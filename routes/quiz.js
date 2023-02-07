const express = require("express");

const router = express.Router();

const auth = require("../helpers/jwt");

const quizController = require("../controllers/quiz");

//GET all quiz
router.get("/", auth.optional, quizController.getAllQuiz);

router.get("/:id", auth.optional, quizController.getQuiz);

//post quiz
router.post("/addQuestion", auth.required, quizController.postQuestion);

//post quiz
router.post("/addQuiz", auth.required, quizController.postQuiz);

//delete quiz
router.post("/delete/:id", auth.required, quizController.deleteQuiz);

module.exports = router;
