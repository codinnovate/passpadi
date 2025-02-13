import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../components/UI/Button';
import NumberInput from './UI/NumberInput';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import toast from 'react-hot-toast';

const subjectsList = ['mathematics', 'english', 'general-paper'];

const CbtSettings = ({ startCBT }) => {
  const [time, setTime] = useState(30);
  const [mathQuestions, setMathQuestions] = useState(10);
  const [englishQuestions, setEnglishQuestions] = useState(20);
  const [generalPaperQuestions, setGeneralPaperQuestions] = useState(10);
  let { userAuth: { access_token , role} } = useContext(UserContext)
  const navigate = useNavigate()
  const totalQuestions = mathQuestions + englishQuestions + generalPaperQuestions;


  const getUser = () => {
    const userRole = localStorage.getItem("role");
    console.log(userRole)
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

    if (role === 'user') {
      toast.error("You need to activate your app before attempting cbt");
      setInterval(() => {
        navigate('/pay-for-app')
      },6000)
    }else {
      startCBT(settings);
    }

  };

  return (
    <div className="max-w-xl mx-auto p-5 border border-gray-300 rounded-3xl bg-white shadow-md mt-10">
      <h1 className="text-center text-xl font-bold  mb-5">CBT Settings</h1>

      <label className="block mt-3  text-xl font-semibold text-black">Set Time (minutes):</label>
      <NumberInput
        value={time}
        onChange={(e) => setTime(Number(e.target.value))}
      />

      <label className="block mt-3  text-xl font-semibold text-black">Mathematics Questions:</label>
      <NumberInput
        value={mathQuestions}
        onChange={(e) => setMathQuestions(Number(e.target.value))}
      />

      <label className="block mt-3  text-xl font-semibold text-black">English Questions:</label>
      <NumberInput
        value={englishQuestions}
        onChange={(e) => setEnglishQuestions(Number(e.target.value))}
      />

      <label className="block mt-3  text-xl font-semibold text-black">General Paper Questions:</label>
      <NumberInput
        value={generalPaperQuestions}
        onChange={(e) => setGeneralPaperQuestions(Number(e.target.value))}
      />

      <div className="text-center bg-green-500 text-white py-2 px-4 rounded mb-4">
        Total Questions: {totalQuestions}
      </div>

      <div className="flex justify-between mt-6">
        <Button
          bgColor="green"
          textColor="black"
          title="Start CBT"
          onClick={handleStartCBT}
        />
      </div>
    </div>
  );
};

export default CbtSettings;
