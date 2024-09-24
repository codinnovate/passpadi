import  express from 'express';
import { createSubject, getAllSubjects, getSubjectById, updateSubject, deleteSubject } from '../controllers/Subject.js';


const router = express.Router();

router.post('/', createSubject)
      .get('/', getAllSubjects)
      .get('/:subject_id', getSubjectById)
      .put('/:id', updateSubject)
      .delete('/:id', deleteSubject)

export default router;