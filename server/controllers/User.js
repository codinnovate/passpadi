import User from "../Schema/User.js";
import bcrypt from 'bcrypt';
import 'dotenv/config'
import { getAuth } from 'firebase-admin/auth';
import { formatDatatoSend } from "../utils/generates.js";
import { generateUsername } from "../utils/generates.js";

export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

const Register = (req, res) => {
    let { fullname, email, password, phoneNumber, referralCode, } = req.body;
    if (fullname.length < 3){
        return res.status(403).json({"error":"Fullname must be at least 3 letters "})
    }
    if (!emailRegex.test(email)) {
        return res.status(403).json({
            "error":"Email is invalid!!"
        })
    }
    if (!passwordRegex.test(password)){
        return res
            .status(403)
            .json({
            "error":"Password should be 6 to 20 characters long with  numberic, 1 lowercase and 1 uppercase letters "})
    }
    bcrypt.hash(password, 10, async(err, hash_password) => {
        let username = await generateUsername(email);
        let user = new User({
            personal_info: {
                fullname, email, password:hash_password , username,  phoneNumber, referralCode }
        })
        user.save().then((u) => {
            return res.status(200).json(formatDatatoSend(u))
        })
        .catch(err => {
                if (err.code == 11000) {
                return res.status(500).json({"error":"Email or Phone Number  already exists"})
                console.log({"error":"Email already exists"})
            }
            return res.status(500).json({"error":err.message})
        })})
}
const Login = (req, res) => {
    let { email, password, deviceInfo } = req.body;
    User.findOne({ "personal_info.email": email })
        .then((user) => {
            if (!user){
                    return res.status(403).json({"error":"Email not found"})
            }
            if (!user.google_auth) {
                bcrypt.compare(password, user.personal_info.password,
                    async (err, result) => {
                        if (err) {
                            return res.status(403).json({"error":"Error occured while login please try again!"})
                        }
                        if (!result) {
                            return res.status(403).json({"error":"Incorrect password"})
                        }
                        else {
                            if (user.deviceInfo && user.deviceInfo !== deviceInfo) {
                                return res.status(403).json({ "error": "User is already logged in on another device." });
                            }
                            console.log("Got Here")
                            user.deviceInfo = deviceInfo; // Update deviceInfo
                            await user.save();
                            return res.status(200).json(formatDatatoSend(user));
                        }
                })
            } else {
                return res.status(403).json({"error":"account was created with google try log in with google"})
            }
        })
        .catch(err => {
        return res.status(500).json({"error":err.message})
    })
}
const GoogleAuth = async (req, res) => {
    let { access_token } = req.body;
    getAuth().verifyIdToken(access_token)
        .then(async (decodeUser) => {
            let { email, name, picture } = decodeUser;
            picture = picture.replace("s96-c", "s384-c");
            let user = await User.findOne({ "personal_info.email": email }).select("personal_info.fullname personal_info.username personal_info.profile_img google_auth").then((u) => {
                return u || null
            })
                .catch(err => {
                    return res.status(500).json({ "error": err.message })
                })
            if (user) {
                if (!user.google_auth) {
                    return res.status(403).json({ "error": "This email was signed up without google. Please log in with your credentials to access the account" })
                }
                
            } else {
                let username = await generateUsername(email);
                user = new User({
                    personal_info: { fullname: name, email, profile_img: picture, username },
                    google_auth:true
                })
                await user.save().then((u) => {
                    user = u;
                })
                    .catch(err => {
                        return res.status(500).json({ "error": err.message })
                })
            }
           return res.status(200).json(formatDatatoSend(user))
        })
        .catch(err => {
            return res.status(500).json({"error":"Authentication Fialed try wih another google account."})
        })
      

    
}

// async function updateUsers() {
//     try {
//       const users = await User.find({ role: { $exists: false } }); // Find users without the role field
//       for (let user of users) {
//         user.role = 'user'; // Set default role for existing users
//         await user.save(); // Save updated user document
//       }
  
//       console.log('Users updated successfully.');
//     } catch (error) {
//       console.error('Error updating users:', error);
//     } finally {
//     }
//   }
  
export {
    Register,Login, GoogleAuth
}