import React, { createContext, useContext, useEffect, useState } from 'react'
import { UserContext } from '../App';
import { Navigate, useParams } from 'react-router-dom';
import ProductEditorPage from '../components/product-editor.component.jsx';
import ProductPublishForm from '../components/product-publish-form';
import Loader from '../components/loader.component';
import axios from 'axios';
import { serverApp } from '../../server'

const productStructure = {
    title: '',
    banner: '',
    price: '',
    des: '',
    categories:[],
    seller:{personal_info:{}}
}

export const ProductEditorContext = createContext({});

const ProductEditor = () => {
    const [product, setproduct] = useState(productStructure);
    const [editorState, setEditorState] = useState("editor");
    let { product_id } = useParams();
    let [ loading, setLoading ] = useState(true);


    let { userAuth: { access_token } } = useContext(UserContext)
    

    useEffect(() => {
        if (!product_id) {
            return setLoading(false);
        }

        axios.post(serverApp + "/get-product", {
            product_id, draft:true, mode:"edit"
        }).then(({ data: { product } }) => {
            setproduct(product);
            setLoading(false)
        }).catch(err => {
            setproduct(product)
            setLoading(false)
        })
    }, [])

    return (
        <ProductEditorContext.Provider value={{product, setproduct, editorState, setEditorState }}>
            {
                access_token === null ? <Navigate to='/signin' />  :
                loading ? <Loader /> :
                editorState == "editor" ? <ProductEditorPage /> : <ProductPublishForm />
            }
        </ProductEditorContext.Provider>
    )
}
 
export default  ProductEditor
