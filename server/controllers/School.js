import { School } from '../Schema/School.js';
import { generateSlug } from '../utils/generates.js';
// Create a new School
export const createSchool = async (req, res) => {
  const { name, about, logo } = req.body;
    try {
        if (name) {
          let school_id = generateSlug(name)
          const checkSchool = await School.findOne({ school_id })
          if (!checkSchool) {
            const newSchool = new School({ name, school_id, about, logo });
            const savedSchool = await newSchool.save();
            res.status(201).json(savedSchool);
          } else {
            res.status(500).json("A School with this name already exists !");
          }
        } else {
            res.status(500).json("Please add a  School Name");
        }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};

// Get all Schools
export const getAllSchools = async (req, res) => {
  try {
    const Schools = await School.find().sort({ createdAt: -1 });
    res.status(200).json(Schools);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single School
export const getSchoolById = async (req, res) => {
  const { school_id } = req.params;
  try {
    const School = await School.findOne(school_id);
    if (!School) return res.status(404).json({ error: 'School not found' });
    res.status(200).json(School);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a School
export const updateSchool = async (req, res) => {
  const { school_id } = req.params;
  const { name } = req.body;
  try {
      const updatedSchool = await School.findByIdAndUpdate({ school_id }, { name }, { new: true });
    if (!updatedSchool) return res.status(404).json({ error: 'School not found' });
    res.status(200).json(updatedSchool);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a School
export const deleteSchool = async (req, res) => {
  const { school_id } = req.params;
  try {
    const deletedSchool = await School.findByIdAndDelete({school_id});
    if (!deletedSchool) return res.status(404).json({ error: 'School not found' });
    res.status(200).json({ message: 'School deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
