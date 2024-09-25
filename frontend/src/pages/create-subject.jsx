import React, { useContext } from 'react'
import SubjectForm from '../components/subjectForm'
import SchoolForm from '../components/schoolForm'
import { UserContext } from '../App';

const CreateSubject = () => {
    const {userAuth:{access_token}} = useContext(UserContext)

    return (
        <div className='max-w-5xl font-medium mx-auto w-full flex flex-col items-center p-2 justify-between'>
            <SubjectForm access_token={access_token} />
            <SchoolForm access_token={access_token}/>
        </div>
    )
}

export default CreateSubject
