import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../components/UI/Button';

const subjectsList = ['mathematics', 'english', 'general-paper'];

const CbtSettings = ({ startCBT }) => {
  const [time, setTime] = useState(30);
  const [mathQuestions, setMathQuestions] = useState(10);
  const [englishQuestions, setEnglishQuestions] = useState(20);
  const [generalPaperQuestions, setGeneralPaperQuestions] = useState(10);
  const [role, setRole] = useState('');

  const totalQuestions = mathQuestions + englishQuestions + generalPaperQuestions;

  useEffect(() => {
    getUser();
    if (role === 'user') {
      alert("You Need to Pay just 1000 Naira to take CBT!!");
      window.history.back();
    }
  }, [role]);

  const getUser = () => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  };

  const handleStartCBT = () => {
    const settings = {
      time,
      subjects: {
        mathematics: mathQuestions,
        english: englishQuestions,
        'general-paper': generalPaperQuestions,
      },
    };
    startCBT(settings);
  };

  return (
    <div className="max-w-xl mx-auto p-5 border border-gray-300 rounded-lg bg-white shadow-md mt-10">
      <h1 className="text-center text-2xl font-bold mb-5">CBT Settings</h1>

      <label className="block mb-2 text-sm font-medium text-gray-700">Set Time (minutes):</label>
      <input
        type="number"
        className="block w-full p-2 border border-gray-300 rounded mb-4"
        value={time}
        onChange={(e) => setTime(Number(e.target.value))}
      />

      <label className="block mb-2 text-sm font-medium text-gray-700">Mathematics Questions:</label>
      <input
        type="number"
        className="block w-full p-2 border border-gray-300 rounded mb-4"
        value={mathQuestions}
        onChange={(e) => setMathQuestions(Number(e.target.value))}
      />

      <label className="block mb-2 text-sm font-medium text-gray-700">English Questions:</label>
      <input
        type="number"
        className="block w-full p-2 border border-gray-300 rounded mb-4"
        value={englishQuestions}
        onChange={(e) => setEnglishQuestions(Number(e.target.value))}
      />

      <label className="block mb-2 text-sm font-medium text-gray-700">General Paper Questions:</label>
      <input
        type="number"
        className="block w-full p-2 border border-gray-300 rounded mb-4"
        value={generalPaperQuestions}
        onChange={(e) => setGeneralPaperQuestions(Number(e.target.value))}
      />

      <div className="text-center bg-green-500 text-white py-2 px-4 rounded mb-4">
        Total Questions: {totalQuestions}
      </div>

      <div className="flex justify-between mt-6">
        <Button
          color="yellow-500"
          textColor="black"
          title="Start CBT"
          onClick={handleStartCBT}
        />
      </div>
    </div>
  );
};

export default CbtSettings;
