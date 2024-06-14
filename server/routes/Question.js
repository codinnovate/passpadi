import  express from 'express';
import  { createQuestion,getQuestionsBySubject, getQuestionById, updateQuestion, deleteQuestion } from '../controllers/Question.js';

const router = express.Router();

router.post('/', createQuestion);
router.get('/:subject_id', getQuestionsBySubject);
router.get('/:id', getQuestionById);
router.put('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

export default router;
