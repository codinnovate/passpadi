import React, { createContext, useContext, useEffect, useState } from 'react'
import { UserContext } from '../App';
import { Navigate, useParams } from 'react-router-dom';
import BlogEditor from '../components/blog-editor.component';
import PublishForm from '../components/publish-form.component';
import Loader from '../components/loader.component';
import axios from 'axios';
import { serverApp } from '../../server'

const blogStructure = {
    title: '',
    banner: '',
    content: [],
    tags: [],
    des: '',
    author:{personal_info:{}}
}

export const ProductEditorContext = createContext({});

const ProductEditor = () => {
    const [blog, setBlog] = useState(blogStructure);
    const [editorState, setEditorState] = useState("editor");
    const [textEditor, setTextEditor] = useState({ isReady:false });
    let { blog_id } = useParams();
    let [ loading, setLoading ] = useState(true);






    let { userAuth: { access_token } } = useContext(UserContext)
    

    useEffect(() => {
        if (!blog_id) {
            return setLoading(false);
        }

        axios.post(serverApp + "/get-blog", {
            blog_id, draft:true, mode:"edit"
        }).then(({ data: { blog } }) => {
            setBlog(blog);
            setLoading(false)
        }).catch(err => {
            setBlog(blog)
            setLoading(false)
        })
    }, [])

    return (
        <EditorContext.Provider value={{blog, setBlog, editorState, setEditorState , textEditor, setTextEditor}}>
            {
                access_token === null ? <Navigate to='/signin' />  :
                loading ? <Loader /> :
                 editorState == "editor" ? <BlogEditor /> : <PublishForm />
            }
        </EditorContext.Provider>
    )
}
 
export default  ProductEditor
