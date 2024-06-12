import { Subject } from '../Schema/Subject.js';

// Create a new subject
export const createSubject = async (req, res) => {
  const { name } = req.body;
    try {
        if (name) {
            let subject_id = generateSlug(name)
            const newSubject = new Subject({ name, subject_id });
            const savedSubject = await newSubject.save();
            res.status(201).json(savedSubject);
        } else {
            res.status(500).json("Please add a  Subject Name");
        }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all subjects
export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ createdAt: -1 });
    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single subject
export const getSubjectById = async (req, res) => {
  const { subject_id } = req.params;
  try {
    const subject = await Subject.findOne({subject_id});
    if (!subject) return res.status(404).json({ error: 'Subject not found' });
    res.status(200).json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a subject
export const updateSubject = async (req, res) => {
  const { subject_id } = req.params;
  const { name } = req.body;
  try {
      const updatedSubject = await Subject.findByIdAndUpdate({ subject_id }, { name }, { new: true });
    if (!updatedSubject) return res.status(404).json({ error: 'Subject not found' });
    res.status(200).json(updatedSubject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a subject
export const deleteSubject = async (req, res) => {
  const { subject_id } = req.params;
  try {
    const deletedSubject = await Subject.findByIdAndDelete({subject_id});
    if (!deletedSubject) return res.status(404).json({ error: 'Subject not found' });
    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
