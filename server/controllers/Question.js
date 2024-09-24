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
      // First, find the subject by its slug (subject_id)
      const subject = await Subject.findOne({ subject_id });

      if (!subject) {
          return res.status(404).json({ error: 'Subject not found' });
      }

      // Now, find the questions using the subject's ObjectId
      const questions = await Question
      .find({ subject: subject._id })
      .populate('author');

      if (!questions.length) {
          return res.status(404).json({ error: 'No questions found for this subject' });
      }

      res.status(200).json(questions);
  } catch (err) {
      res.status(500).json({ error: err.message });
      console.error(err);
  }
};


export const fetchQuestions = async (req, res) => {
    const {
        examYear,
        examType,
        subject_id,
        page = 1, // Default to the first page if not provided
    } = req.query;

    const limit = 40; // Minimum questions per page
    const skip = (page - 1) * limit;

    // Build the query object
    const query = {};

    // If examType and examYear are provided, they will be included in the filter
    if (examYear) {
        query.examYear = examYear; // Filter by examYear
    }
    if (examType) {
        query.examType = examType; // Filter by examType
    }

    try {
        // If subject_id is provided, find the corresponding subject
        if (subject_id) {
            const subject = await Subject.findOne({ subject_id });

            if (!subject) {
                return res.status(404).json({ error: 'Subject not found' });
            }

            // Add the subject's ObjectId to the query
            query.subject = subject._id; // Use subject's _id for the question query
        }

        // Fetch questions based on the constructed query
        const questions = await Question.find(query)
            .skip(skip)
            .limit(limit)
            .populate('author'); // Adjust as needed to include any other population

        const totalQuestions = await Question.countDocuments(query); // Count total documents for pagination

        res.status(200).json({
            totalQuestions,
            totalPages: Math.ceil(totalQuestions / limit),
            currentPage: page,
            questions,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.error(err);
    }
};






