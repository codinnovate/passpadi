import  express from 'express';
import  { createQuestion, getAllQuestions,getQuestionsBySubject, getQuestionById, updateQuestion, deleteQuestion, fetchQuestions } from '../controllers/Question.js';

const router = express.Router();
router.post('/', createQuestion)
      .get('/v1/:subject_id', getQuestionsBySubject)
      .get('/one/:question_id', getQuestionById)
      .put('/:question_id', updateQuestion)
      .delete('/:id', deleteQuestion)
      .get('/', fetchQuestions)


export default router;
