import axios from "axios"
import { server } from "@/server"

export const getProfile = async ({userId}) => {
    try {
      const response = await axios.get(`${server}/me/${userId}`)
      setUser(response.data.personal_info)
      console.log(response.data.personal_info)
    } catch (error) {
      console.log(error)
    }
}