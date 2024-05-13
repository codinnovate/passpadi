import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';




const firebaseConfig = {
  apiKey: "AIzaSyCVe0gKZH_FM90Pydaiqa83a--7eSmX_sM",
  authDomain: "passpadi-a46ed.firebaseapp.com",
  projectId: "passpadi-a46ed",
  storageBucket: "passpadi-a46ed.appspot.com",
  messagingSenderId: "954271224847",
  appId: "1:954271224847:web:11aacb0599f346cb4aff7a"
};

const app = initializeApp(firebaseConfig);
// google auth
const provider = new GoogleAuthProvider()
const auth = getAuth();

export const authWithGoogle = async () => {
    let user = null;
    await signInWithPopup(auth, provider)
        .then((result) => {
        user = result.user
        })
        .catch((err) => {
            console.log(err)
        })
    
    return user;

}
