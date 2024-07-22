import mongoose from 'mongoose';
import { Question } from '../Schema/Question.js';
import { Subject } from '../Schema/Subject.js';
import { generateSlug } from '../utils/generates.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname in ES6 module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transformQuestionData = (data, subjectId) => {
    return data
    .filter(item => item.question) // Filter out items without a question field
    .map((item) => ({
    subject: subjectId,
    school:"",
    instruction: item.section || "",
    question: item.question,
    question_id: generateSlug(item.question), // Generate slug from question
    options: Object.values(item.option),
    examType: item.exam_year.toUpperCase(), // Ensure the exam type is in uppercase
    examYear: parseInt(item.examyear),
    answer: item.option[item.answer], // Map answer key to actual answer
    answerDetail: item.solution || "",
  }));
};

const uploadQuestionsFromFile = async () => {
  const filePath = path.join(__dirname, 'data.json');

  fs.readFile(filePath, 'utf8', async (err, jsonData) => {
    if (err) {
      console.error('Failed to read data file:', err);
      return;
    }

    try {
      const data = JSON.parse(jsonData);
      const { subject } = data;

      if (!subject || !data.data || !Array.isArray(data.data)) {
        console.error('Invalid data format');
        return;
      }

      // Find the subject in the database
      console.log('Finding subject in the database...');
      const subjectDoc = await Subject.findOne({ subject_id: subject });
        if (!subjectDoc) {
            const subjects = await Subject.find()
            console.log(subjects)
        console.error('Subject not found');
        return;
      }

      const transformedData = transformQuestionData(data.data, subjectDoc._id);

      // Handle duplicate question_ids
      for (const question of transformedData) {
        const existingQuestion = await Question.findOne({ question_id: question.question_id });
        if (existingQuestion) {
            continue; // Skip duplicate question
            
        }
        await new Question(question).save();
      }

      console.log('Questions uploaded successfully');
    } catch (err) {
      console.error('Error uploading questions:', err.message);
    }
  });
};

// Connect to MongoDB and call the function to upload questions
console.log('Connecting to MongoDB...');
mongoose.connect('mongodb+srv://sammy:vNO2It2O5WEYuAVR@passpadi.v9qaprf.mongodb.net/?retryWrites=true&w=majority&appName=passpadi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // 30 seconds
}).then(() => {
  console.log('MongoDB connected');
  uploadQuestionsFromFile();
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
