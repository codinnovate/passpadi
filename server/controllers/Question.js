import { Question } from '../Schema/Question.js';
import { Subject } from '../Schema/Subject.js';
import { generateSlug } from '../utils/generates.js';


// Create a new question
export const createQuestion = async (req, res) => {
  const { question, options, school , answer, answerDetail, instruction, examType, examYear, subject } = req.body;
  try {
    const findSubject = await Subject.findById(subject);
    if (!findSubject) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    let question_id = generateSlug(question)
    const newQuestion = new Question({question_id, school, instruction, question, options, answer, examType, examYear, subject , answerDetail});
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all questions
export const getAllQuestions = async (req, res) => {
  const { subject } = req.params
  
  try {
    const questions = await Question.find()
      .populate('subject')
      .sort({ createdAt: -1 })
      .limit(30)
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single question
export const getQuestionById = async (req, res) => {
  const { question_id } = req.params;
  try {
    const question = await Question.findOne({ _id:question_id })
    .populate("school subject");
    if (!question)
      return res.status(404).json({ error: 'Question not found' });
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// async function updateExamYear() {
//   try {
//     const result = await Question.updateMany({ examYear: 2024 }, { $set: { examYear: 2023 } });
//     console.log('Update result:', result);
//   } catch (error) {
//     console.error('Error updating examYear:', error);
//   } finally {
//     mongoose.connection.close();
//   }
// }

// updateExamYear();
// Update a question
export const updateQuestion = async (req, res) => {
  const { question_id } = req.params;
  const { question, options, school , answer, answerDetail, instruction, examType, examYear, subject } = req.body;

  try {
    const question = await Question.findOne({ _id:question_id })
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    const updatedQuestion = await Question.findByIdAndUpdate({ _id:question_id }, req.body, { new: true });
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




export const getQuestionsBySubject = async (req, res) => {
  const { subject_id } = req.params;
  if (!subject_id) {
      return res.status(400).json({ error: 'Subject ID is required' });
  }
  try {
    const questions = await Question.find()
      .populate('subject')
      .sort({ createdAt: -1 });
    const filteredQuestions = questions.filter(question => question.subject.subject_id === subject_id);
    return res.status(200).json(filteredQuestions);
    
  } catch (err) {
    console.log(err);
      return res.status(500).json({ error: err.message });
  }
};


// Controller function to get questions based on filters
export const getFilteredQuestions = async (req, res) => {
    try {
        const { examYear, examType, subject, school } = req.query;

        // Build the query object
        let query = {};
        
        if (examYear) query.examYear = examYear;
        if (examType) query.examType = examType;
        if (subject) query.subject = subject;
        if (examType === 'POST UTME' && school) {
            query.school = school;
        }

        // Fetch questions based on the query
        const questions = await Question.find(query)
            .populate('subject', 'name')  // Adjust the fields to populate as necessary
            .populate('school', 'name')
            .populate('author', 'name');

        // Send response
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching filtered questions:', error);
        res.status(500).json({ message: 'Error fetching filtered questions' });
    }
};





