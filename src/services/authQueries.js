import baseAPI from "./API"
const authQueries = {
    async register(data) {
        console.log(data)
        try {
            const response = await baseAPI.post( 'auth/register', data)
            console.log(response)
            return response.data.response
        } catch (error) {
            console.log(error)
            throw new Error(error.response ? error.response.data.message : error.message)

        }
    },
    async login(data) {
        console.log(data)
        try {
            const response = await baseAPI.post('auth/login', data)
            const token = response.data.response.token
            localStorage.setItem('token', token)
            return response.data.response
        } catch (error) {
            console.log(error)
            throw new Error(error.response ? error.response.data.message : error.message)
        }
    },
    async deactivateUser(userId){
        try {
            const response = await baseAPI.put(`auth/deactivate`, userId)
            return response.data.response
        } catch (error) {
            console.log(error)
            throw new Error(error.response ? error.response.data.message : error.message)
        }
    },
    async changePassword(userId, newPassword){
        console.log(userId, newPassword)
        try {
            const response = await baseAPI.put(`auth/password/${userId}`, newPassword)
            return response.data.response
        } catch (error) {
            console.log(error)
            throw new Error(error.response ? error.response.data.message : error.message)
        }
    },
    async loginToken(token){
        try {
            const response = await baseAPI.post(`auth/token`, {}, {
                headers:{
                    'authorization': 'Bearer ' + token
                }
            })
            return response.data.response
        } catch (error) {
            console.log(error)
            throw new Error(error.response ? error.response.data.message : error.message)
        }
    }
}

export default authQueries