import axios from "axios"
import {TableData, UserPosts} from "global"

export const getTableData = async() => {
    const response = await axios.get("https://gorest.co.in/public-api/users")
    const {data = []} = await response.data
    return data as TableData[]
}

export const getUserPosts = async(id:number) => {
    const response = await axios.get(`https://gorest.co.in/public-api/users/${id}/posts`)
    const {data = []} = await response.data
    return data as UserPosts[]
}