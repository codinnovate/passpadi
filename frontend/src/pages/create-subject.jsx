import React from 'react'
import SubjectForm from '../components/subjectForm'
import SchoolForm from '../components/schoolForm'

const CreateSubject = () => {
    return (
        <div className='max-w-5xl font-medium mx-auto w-full flex flex-col items-center p-2 justify-between'>
            <SubjectForm />
            <SchoolForm />
        </div>
    )
}

export default CreateSubject
