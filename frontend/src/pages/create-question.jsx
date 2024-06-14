import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { serverApp } from '../../server';
import toast, { Toaster } from 'react-hot-toast';

const CreateQuestion = () => {
    const [subjects, setSubjects] = useState([]);
    const [subject, setSubject] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [answer, setanswer] = useState('');
    const [answerDetail, setAnswerDetail ] = useState('');
    const [examYear, setExamYear] = useState(new Date().getFullYear());
    const [examType, setExamType] = useState('JAMB');
    const examTypes = ['JAMB', 'NECO', 'WAEC', 'POST UTME'];

    useEffect(() => {
        // Fetch subjects from the backend
        axios.get(`${serverApp}/api/subjects`)
            .then(response =>
                setSubjects(response.data)
            )
            .catch(error => console.error('Error fetching subjects:', error));
    }, []);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newQuestion = {
            subject,
            question: questionText,
            options,
            answer,
            examYear,
            examType,
            answerDetail
        };
        console.log(newQuestion);
        try {
            const response = await axios.post(`${serverApp}/api/questions`, newQuestion);
            toast.success('Question created:', response.data);
            // Clear form after submission
            setSubject('');
            setQuestionText('');
            setOptions(['', '', '', '']);
            setanswer('');
            setAnswerDetail('');
            setExamType('');
            setExamYear(new Date().getFullYear());
        } catch (error) {
            console.error('Error creating question:', error);
            toast.error('Error creating question:', error);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
            <Toaster />
            <h1 className="text-2xl font-bold mb-4">Create a New Question</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Subject</label>
                    <select
                        className="input-box h-[2em]"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    >
                        <option value="">Select Subject</option>
                        {subjects.map((subj) => (
                            <option key={subj._id} value={subj._id}>{subj.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Exam Type</label>
                    <select
                        className="block w-full border border-gray-300 rounded py-2 px-3"
                        value={examType}
                        onChange={(e) => setExamType(e.target.value)}
                        required
                    >
                        {examTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Question</label>
                    <textarea
                        className="block w-full border border-gray-300 rounded py-2 px-3"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        required
                    />
                </div>
                {options.map((option, index) => (
                    <div className="mb-4" key={index}>
                        <label className="block text-gray-700 font-bold mb-2">Option {index + 1}</label>
                        <input
                            className="block w-full border border-gray-300 rounded py-2 px-3"
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            required
                        />
                    </div>
                ))}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Correct Option</label>
                    <input
                        className="block w-full border border-gray-300 rounded py-2 px-3"
                        type="text"
                        value={answer}
                        onChange={(e) => setanswer(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Exam Year</label>
                    <input
                        className="block w-full border border-gray-300 rounded py-2 px-3"
                        type="number"
                        value={examYear}
                        onChange={(e) => setExamYear(e.target.value)}
                        min="1978"
                        max={new Date().getFullYear()}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-black text-white font-bold py-2 px-4 rounded"
                >
                    Create Question
                </button>
            </form>
        </div>
    );
};

export default CreateQuestion;
