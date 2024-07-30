import  express from 'express';
import  { createQuestion, getAllQuestions,getQuestionsBySubject, getQuestionById, updateQuestion, deleteQuestion, getFilteredQuestions } from '../controllers/Question.js';

const router = express.Router();
router.post('/', createQuestion);
router.get('/',getAllQuestions)
router.get('/v1/:subject_id', getQuestionsBySubject);
router.get('/one/:question_id', getQuestionById);
router.put('/:question_id', updateQuestion);
router.delete('/:id', deleteQuestion);
router.get('/questions', getFilteredQuestions)


export default router;
