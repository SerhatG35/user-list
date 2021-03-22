import axios from "axios"
import {TableData} from "global"

export const getTableData = async() => {
    const response = await axios.get("https://gorest.co.in/public-api/users")
    const {data = []} = await response.data
    return data as TableData[]
}