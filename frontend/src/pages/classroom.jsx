import React, { useContext } from 'react'
import SubCard from '../components/SubCard.jsx';
import Images from '../constants/Images';
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from '../App.jsx';

const cards = [
  {name:"Math", link:"classroom/mathematics", image:Images.math, bgColor:'bg-[#f8f899]'},
  {name:"English", link:"classroom/english", image:Images.english, bgColor:'bg-[#f55f99]'},
  {name:"General Paper", link:"classroom/general-paper", image:Images.gpaper , bgColor:'bg-[#55ff99]'},
  {name:"Cbt", link:"/cbt", image:Images.cbt , bgColor:'bg-[#f9f933]'},
]

const Classroom = () => {
    const {userAuth:{username}} = useContext(UserContext);
  return (
    <div className='w-full  p-2 h-screen max-w-4xl mx-auto '>
  <div className='flex w-full  justify-between items-center mt-10'>
      <div className='flex'>
        <h1 className='font-medium'>Hi,</h1>
        <h2 className='font-semibold text-xl'>@{username ? username : "Genius" } </h2>
      </div>
    </div>     
    <h1 className={`text-[#015055]  font-semibold text-2xl`}>What Subjects do you Want to improve on today ?</h1>
      <div className='flex gap-5 mt-10 flex-col'>
      {
         cards.map((card, index) => (
           <SubCard
           bgColor={card.bgColor}  
           key={index}
           link={card.link}
           image={card.image}
           text={card.name}
           />
          ))
        }
      </div>
      <Link to='https://chat.whatsapp.com/CZ9ilb1DQZR49k8UizskAl'>
      <div
        className='w-full bg-green mt-3 rounded-2xl flex flex-col justify-center h-[100px] p-3 mb-[3em]'>
        <h1 className='text-white text-xl mt-2'>Join Unilag Whatsapp Group for Updates</h1>
        <button className='bg-white w-fit py-1.5 hover:bg-green transition-all duration-150 px-4 font-semibold rounded-full mt-3'>
          Join for Free
        </button>
      </div>
        </Link>
     
    </div>

  )
}

export default Classroom
