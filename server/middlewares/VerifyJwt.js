import jwt from 'jsonwebtoken';


export const verifyJWT = (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1];
    if (token == null) {
        return res.status(401).json({ error: "No access token" })
        
    }

    jwt.verify(token, process.env.SECRET_ACCESS_KEY, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(403).json({ error: "Access token is invalid" })
            console.log(err)
        }
        req.user = user.id
        req.role = user.role;
        next();
    })
}   
