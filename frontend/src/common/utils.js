import axios from "axios"
import { serverApp } from "../../server"




export const getMe = async ({access_token, user}) => {
    try {
        await axios.get(serverApp + '/profile', {
            headers:{
                Authorization:`Bearer ${access_token}`
            },
        }).then((res) => {
           user = res.data;
        })
    } catch (error) {
        console.log(error)
    }

}

getMe();