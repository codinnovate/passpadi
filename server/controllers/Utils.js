import mongoose from 'mongoose';
import { Question } from '../Schema/Question.js';
import { Subject } from '../Schema/Subject.js';
import { generateSlug } from '../utils/generates.js';
import fs from 'fs';
import 'dotenv/config'
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname in ES6 module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const transformQuestionData = (data, subjectId) => {
  return data
      .filter(item => item.question) // Filter out items without a question field
      .map((item) => {
          // Determine the solution field based on the subject
          const solutionField = item.section && item.subject === "mathematics" 
              ? item.section 
              : item.solution || ""; // Fallback to empty string if no solution is provided

          return {
              subject: subjectId,
              instruction: item.section || "", // Keep the section for non-mathematics subjects
              question: item.question,
              image:item.image,
              question_id: generateSlug(item.question), // Generate slug from question
              options: Object.values(item.option),
              examType: (() => {
                const examTypeUpper = item.examtype.toUpperCase();
                if (examTypeUpper === 'UTME') return 'JAMB';
                if (examTypeUpper === 'WASSCE') return 'WAEC';
                if (examTypeUpper === 'POST-UTME') return 'POST UTME';
                return examTypeUpper;
              })(),
              examYear: parseInt(item.examyear),
              answer: item.option[item.answer], // Map answer key to actual answer
              answerDetail: solutionField, // Use the determined solution field
          };
      });
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
 const updateMathematicsQuestions = async () => {
  try {
      // Step 1: Fetch existing questions related to mathematics
      const subjectDoc = await Subject.findOne({ subject_id: "mathematics" });
      if (!subjectDoc) {
          console.error('Mathematics subject not found');
          return;
      }

      const questions = await Question.find({ subject: subjectDoc._id });

      // Step 2: Update each question as necessary
      const updates = questions.map(async (question) => {
          if (question.subject.toString() === subjectDoc._id.toString() && question.instruction) {
              // If the question is for mathematics and has a section, update the solution field
              question.answerDetail = question.instruction; // Update solution field
              question.instruction = ""; // Clear instruction field if desired

              // Step 3: Save the updated question
              await question.save();
              console.log(`Updated question ID ${question._id} with new solution`);
          }
      });

      // Wait for all updates to complete
      await Promise.all(updates);
      console.log('All applicable mathematics questions updated successfully');
  } catch (err) {
      console.error('Error updating questions:', err.message);
  }
};

// Call the function to update questions

// Connect to MongoDB and call the function to upload questions
console.log('Connecting to MongoDB...');
mongoose.connect(process.env.DB_LOCATION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // 30 seconds
}).then(() => {
  console.log('MongoDB connected');
  uploadQuestionsFromFile();
  // updateMathematicsQuestions();

}).catch(err => {
  console.error('MongoDB connection error:', err);
});
