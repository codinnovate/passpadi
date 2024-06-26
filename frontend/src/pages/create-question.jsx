import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { serverApp } from '../../server';
import toast, { Toaster } from 'react-hot-toast';
import Ocr from '../components/Ocr';
import { tools } from '../components/tools.component';
import { Link } from 'react-router-dom';
import Editor from 'quill-editor-math'
import 'quill-editor-math/dist/index.css'


const CreateQuestion = () => {
    const [subjects, setSubjects] = useState([]);
    const [schools, setSchools] = useState([]);
    const [school, setSchool] = useState('');
    const [instruction, setInstruction] = useState('');
    const [subject, setSubject] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [answer, setanswer] = useState('');
    const [answerDetail, setAnswerDetail] = useState('');
    const [examYear, setExamYear] = useState(2024);
    const [examType, setExamType] = useState('JAMB');
    const examTypes = ['JAMB', 'NECO', 'WAEC', 'POST UTME'];

    useEffect(() => {
        axios.get(`${serverApp}/subjects`)
            .then(response =>
                setSubjects(response.data)
            )
            .catch(error => console.error('Error fetching subjects:', error));
        
         axios.get(`${serverApp}/schools`)
            .then(response =>
                setSchools(response.data)
            )
            .catch(error => console.error('Error fetching subjects:', error));
        
    }, []);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = async (e) => {
        
        if (!questionText) {
            toast.error("Add a Question Text")
        }
        e.preventDefault();
        const newQuestion = {
            subject,
            school,
            instruction,
            question: questionText,
            options,
            answer,
            examYear,
            examType,
            answerDetail
        };
        console.log(newQuestion)
        try {
            const response = await axios.post(`${serverApp}/questions`, newQuestion);
            toast.success('Question created Successfully');
            // Clear form after submission
            console.log(response);
                setOptions(['', '', '', '']);
                setanswer('');
                setAnswerDetail('');
        } catch (error) {
            console.error('Error creating question:', error);
            toast.error('Error creating question:', error);
        }
    };

    return (
        <div className="max-w-5xl font-medium mx-auto mt-10 p-2 w-full">
            <Toaster />
            <div className='flex justify-between items-center border-b border-grey mb-4'>
            <h1 className="text-2xl font-bold mb-4">Create a New Question</h1>
                <a
                    href='/image-to-text'
                    target="_blank"
                    className="bg-black text-white font-bold py-2 px-4 rounded">
                    Use Image 2 Text
                </a>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className='flex flex-wrap place-content-between'>
                <div className="mb-4">
                    <label className="block text-dark-grey font-bold mb-2">Subject</label>
                    <select
                        className="border-grey border text-black h-[2em]"
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
                    <label className="block text-dark-grey font-bold mb-2">School</label>
                    <select
                        className="border-grey border text-black h-[2em]"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                    >
                        <option value="">Select School</option>
                        {schools.map((school) => (
                            <option key={school._id} value={school._id}>{school.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-dark-grey font-bold mb-2">Exam Type</label>
                    <select
                        className="block w-full border border-grey rounded py-2 px-3"
                        value={examType}
                        onChange={(e) => setExamType(e.target.value)}
                        required
                    >
                        {examTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                </div>
                <div className="mb-4">
                    <label className="block text-dark-grey font-bold mb-2">Instruction</label>
                    <textarea
                        className="block w-full border border-grey rounded py-2 px-3"
                        value={instruction}
                        onChange={(e) => setInstruction(e.target.value)}
                    />
                </div>
               
                <div className="mb-4">
                    <label className="block text-dark-grey font-bold mb-2">Question</label>
                    <textarea
                        className="block w-full border border-grey rounded py-2 px-3"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.questionText)}
                    />
                </div>
                <div  className='my-3'/>
                {options.map((option, index) => (
                    <div className="mb-4" key={index}>
                        <label className="block text-dark-grey font-bold mb-2">Option {index + 1}</label>
                        <input
                            className="block w-full border border-grey rounded py-2 px-3"
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            required
                        />
                    </div>
                ))}
                <div className="mb-4">
                    <label className="block text-dark-grey font-bold mb-2">Correct Option</label>
                    <input
                        className="block w-full border border-grey rounded py-2 px-3"
                        type="text"
                        value={answer}
                        onChange={(e) => setanswer(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-dark-grey font-bold mb-2">Answer Detail</label>
                    <textarea
                        className="block w-full border border-grey rounded py-2 px-3"
                        value={answerDetail}
                        onChange={(e) => setAnswerDetail(e.target.value)}
                    />
                </div>
                 
                <div className="mb-4">
                    <label className="block text-dark-grey font-bold mb-2">Exam Year</label>
                    <input
                        className="block w-full border border-grey rounded py-2 px-3"
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
