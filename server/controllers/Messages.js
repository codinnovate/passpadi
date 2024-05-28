import Messages from "../Schema/Messages";



export const newMessage = async (req, res) => {
    const message = req.body;
    Messages.create(message, (err, data) => {
        if(err){
            res.status(500).json({err:err.message})
        }else {
            res.status(201).json(data, {message:"Message Created Successfully"})
        }
    })

}

export const getMessages = async (req, res) => {
    Messages.find((err, data) => {
        if(err){
            res.status(500).json({err:err.message})
        }else {
            res.status(200).json(data, {message:"Message Created Successfully"})
        }
    })
}