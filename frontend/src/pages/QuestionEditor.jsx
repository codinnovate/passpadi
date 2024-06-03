import React from 'react'
import Textarea from '../components/UI/textarea'

const QuestionEditor = () => {
    return (
        <div className='w-full max-w-6xl mx-auto mt-[3em] p-2'>
            <h1>Question Editor</h1>

            <div className='flex flex-col gap-5'>
                <h1 className='text-xl font-bold'>Add Question</h1>
                <Textarea />
                <div className='grid grid-cols-2 md:grid-cols-4  gap-2 w-full'>
                    <div className='flex w-full max-w-[15em] rounded-3xl h-[5em] ring-green ring-1 flex-col  items-center justify-center'>
                        <i className='fi fi-rr-plus'></i>
                        <h1 className='font-semibold '>Add Answer</h1>
                    </div>
                     <div className='flex w-full max-w-[15em] rounded-3xl h-[5em] ring-green ring-1 flex-col  items-center justify-center'>
                        <i className='fi fi-rr-plus'></i>
                        <h1 className='font-semibold '>Add Answer</h1>
                    </div>
                     <div className='flex w-full max-w-[15em] rounded-3xl h-[5em] ring-green ring-1 flex-col  items-center justify-center'>
                        <i className='fi fi-rr-plus'></i>
                        <h1 className='font-semibold '>Add Answer</h1>
                    </div>
                     <div className='flex w-full max-w-[15em] rounded-3xl h-[5em] ring-green ring-1 flex-col  items-center justify-center'>
                        <i className='fi fi-rr-plus'></i>
                        <h1 className='font-semibold '>Add Answer</h1>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    )
}

export default QuestionEditor
