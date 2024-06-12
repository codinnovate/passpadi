import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";
import Editor from "./pages/editor.pages";
import HomePage from "./pages/home.page";
import SearchPage from "./pages/search.page";
import PageNotFound from "./pages/404.page";
import ProfilePage from "./pages/profile.page";
import BlogPage from "./pages/blog.page";
import Privacy from "./pages/privacy";
import Footer from "./pages/footer";
import AdsTxt from "./pages/ads.page";
import Store from "./pages/store.pages";
import ProductEditor from "./components/product-editor.component";
import Quiz from "./pages/Quiz";
import QuestionEditor from "./pages/QuestionEditor";
import ProductDetail from "./pages/product.page";
import Transactions from "./pages/transactions";
import Seo from "./components/Seo";
import SideNav from './components/sidenavbar.component'
import ChangePassword from "./pages/change-password.page";
import Classroom from "./pages/classroom";
import CreateSubject from "./pages/createSubject";



export const UserContext = createContext({});

const App = () => {
    const [userAuth, setUserAuth] = useState({});
    useEffect(() => {
        let userInSession = lookInSession("user");
        userInSession ?  setUserAuth(JSON.parse(userInSession)) : setUserAuth({access_token:null})
    },[])

    return (
        <UserContext.Provider value={{ userAuth, setUserAuth }}>
            <Seo
            title="Passpadi | Built by Students For Students"
            des="PassPadi is a dynamic and innovative social networking platform tailored specifically for students striving to excel in their exams"
            />
            <Routes>
            <Route path="/editor" element={<Editor />} />
                <Route path="/editor/:blog_id" element={<Editor />} />
                <Route path="/add-product" element={<ProductEditor />} />
                <Route path="/" element={[<Navbar key={1} />, <Footer key={2} />]}>
                    <Route path='/transactions/:reference' element={<Transactions />} />
                    <Route path='/question-editor' element={<QuestionEditor />} />
                <Route path="product/:productId" element={<ProductDetail />} />
                    <Route index element={<HomePage />} />
                    <Route path="settings" element={<SideNav />}>
                        <Route path='edit-profile' element={<h1>This is to edit profile </h1>} />
                        <Route path='change-password' element={<ChangePassword />} />
                    </Route>
                     <Route path="signin" element={<UserAuthForm  type="sign-in"/>}/>
                    <Route path="signup" element={<UserAuthForm type="sign-up" />} />
                    <Route path="search/:query" element={<SearchPage />} />
                    <Route path="user/:id" element={<ProfilePage />} />
                    <Route path="blog/:blogId" element={<BlogPage />} />
                    <Route path="*" element={<PageNotFound />} />
                    <Route path="/classroom" element={<Classroom />} />
                    <Route path='/create-subject' element={<createSubject />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path='/ads.txt' element={<AdsTxt />} />
                    
                </Route>
                
        </Routes>
        </UserContext.Provider>
    )
}

export default App;