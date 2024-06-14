import { Question } from '../Schema/Question.js';
import { Subject } from '../Schema/Subject.js';
import { generateSlug } from '../utils/generates.js';

// Create a new question
export const createQuestion = async (req, res) => {
  const { question, options, answer, answerDetail, examType, examYear, subject } = req.body;
  try {
    const findSubject = await Subject.findById(subject);
    if (!findSubject) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    let question_id = generateSlug(question)
    const newQuestion = new Question({question_id, question, options, answer, examType, examYear, subject , answerDetail});
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all questions
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate('subject').sort({ createdAt: -1 });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single question
export const getQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findById(id).populate('subject');
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a question
export const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { question, options, answer, examType, examYear, subjectId } = req.body;
  try {
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    const updatedQuestion = await Question.findByIdAndUpdate(id, { question, options, answer, examType, examYear, subject: subjectId }, { new: true });
    if (!updatedQuestion) return res.status(404).json({ error: 'Question not found' });
    res.status(200).json(updatedQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a question
export const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) return res.status(404).json({ error: 'Question not found' });
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
