import baseAPI from "./API"
const commentQueries = {
    async getAllComments(){
        try {
            const response = await baseAPI(`comments/`)
            return response.data.response
        } catch (error) {
            console.log(error)
            throw new Error(error.response ? error.response.data.message : error.message)
        }
    },
    async getCommentById(id){
        try {
            const response = await baseAPI(`comments/${id}`)
            return response.data.response
        } catch (error) {
            console.log(error)
            throw new Error(error.response ? error.response.data.message : error.message)
        }
    },
    async createComment(newData){
        console.log(newData)
        try {
            const response = await baseAPI.post(`comments/`, newData)
            return response.data.response
        } catch (error) {
            console.log(error)
            throw new Error(error.response ? error.response.data.message : error.message)
        }
    },
    async deleteComment(id){
        try {
            const response = await baseAPI.delete(`comments/${id}`)
            return response.data.response
        } catch (error) {
            console.log(error)
            throw new Error(error.response ? error.response.data.message : error.message)
        }
    },
    async updateComment(commentId, newData){
        console.log(commentId, newData)
        try {
            const response = await baseAPI.put(`comments/${commentId}`, newData)
            return response.data.response
        } catch (error) {
            console.log(error)
            throw new Error(error.response ? error.response.data.message : error.message)
        }
    }

}

export default commentQueries