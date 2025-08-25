import baseAPI from "./API";

const subjectQueries = {
    async getSubjects(){
        try {
            const response = await baseAPI(`subjects`)
            return response.data.response
        } catch (error) {
            console.log(error)
            throw new Error(error.response ? error.response.data.message : error.message)
        }
    },
    async getOneSubject(id){
        try {
            const response = await baseAPI(`subjects/${id}`)
            return response.data.response
        } catch (error) {
            console.log(error)
            throw new Error(error.response ? error.response.data.message : error.message)
        }
    },
    async createSubject(data){
        console.log(data)
        try {
            const response = await baseAPI.post(`subjects/`, data)
            return response.data.response
        } catch (error) {
            console.log(error)
            throw new Error(error.response ? error.response.data.message : error.message)
        }
    },
    async deleteSubject(id){
        try {
            const response = await baseAPI.delete(`subjects/${id}`)
            return response.data.response
        } catch (error) {
            console.log(error)
            throw new Error(error.response ? error.response.data.message : error.message)
        }
    },
    async updateSubject(subjectId, newData){
        console.log(subjectId, newData)
        try {
            const response = await baseAPI.put(`subjects/${subjectId}`, newData)
            return response.data.response
        } catch (error) {
            console.log(error)
            throw new Error(error.response ? error.response.data.message : error.message)
        }
    }
}


export default subjectQueries