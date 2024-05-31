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
import ProductEditor from "./components/product.editor";


export const UserContext = createContext({});

const App = () => {
    const [userAuth, setUserAuth] = useState({});
    useEffect(() => {
        let userInSession = lookInSession("user");
        userInSession ?  setUserAuth(JSON.parse(userInSession)) : setUserAuth({access_token:null})
    },[])

    return (
        <UserContext.Provider value={{userAuth, setUserAuth}}>
            <Routes>
            <Route path="/editor" element={<Editor />} />
                <Route path="/editor/:blog_id" element={<Editor />} />
                <Route path="/add-product" element={<ProductEditor /> } />
                <Route path="/add-product" element={<ProductEditor /> } />
                <Route path="/" element={[<Navbar key={1} />, <Footer key={2} />]}>
                    <Route index element={<HomePage />}  />
                     <Route path="signin" element={<UserAuthForm  type="sign-in"/>}/>
                    <Route path="signup" element={<UserAuthForm type="sign-up" />} />
                    <Route path="search/:query" element={<SearchPage />} />
                    <Route path="user/:id" element={<ProfilePage />} />
                    <Route path="blog/:blogId" element={<BlogPage />} />
                    <Route path="*" element={<PageNotFound />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/store" element={<Store />} />
                    <Route path='/ads.txt' element={<AdsTxt />} />
                    
                </Route>
                
        </Routes>
        </UserContext.Provider>
    )
}

export default App;