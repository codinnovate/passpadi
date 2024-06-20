import  express from 'express';
import  { createQuestion, getAllQuestions,getQuestionsBySubject, getQuestionById, updateQuestion, deleteQuestion } from '../controllers/Question.js';

const router = express.Router();

router.post('/', createQuestion);
router.get('/',getAllQuestions)
router.get('/v1/:subject_id', getQuestionsBySubject);
router.get('/one/:question_id', getQuestionById);
router.put('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

export default router;
