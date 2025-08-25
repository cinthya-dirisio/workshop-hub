import baseAPI from "./API";
const userQueries = {
    async getAllUsers(){
        try {
            const response = await baseAPI(`users/`)
            return response.data.response
        } catch (error) {
            console.log(error)
            throw new Error(error.response ? error.response.data.message : error.message)
        }
    },
    async getUserById(id){
        try {
            const response = await baseAPI(`users/${id}`)
            return response.data.response
        } catch (error) {
            console.log(error)
            throw new Error(error.response ? error.response.data.message : error.message)
        }
    },
    async updateUser(id, newData){
        console.log(id, newData)
        try {
            const response = await baseAPI.put(`users/${id}`, newData)
            return response.data.response
        } catch (error) {
            console.log(error)
            throw new Error(error.response ? error.response.data.message : error.message)
        }
    }
}

export default userQueries