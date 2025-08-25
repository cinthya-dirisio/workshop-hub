import baseAPI from "./API"
const workshopQueries = {
    async getAll(){
        try {
            const response = await baseAPI('workshops')
            return response.data.response
        } catch (error) {
            console.log(error)
            return []
        }
    },
    async getOneById(id){
        try {
            const response = await baseAPI(`workshops/${id}`)
            return response.data.response
        } catch (error) {
            console.log(error)
            return {}
        }
    },
    async addParticipant(userId, workshopId) {
        console.log(userId)
        try {
            const response = await baseAPI.post(`workshops/${workshopId}`, userId)
            return response.data.response
        } catch (error) {
            console.log(error)
            throw new Error(error.response ? error.response.data.message : error.message)
        }
    },
    async createWorkshop(workshopData){
        console.log(workshopData)
        try {
            const response = await baseAPI.post(`workshops`, workshopData)
            return response.data.response
        } catch (error) {
            console.log(error)
            throw new Error(error.response ? error.response.data.message : error.message)
        }
    },
    async deleteWorkshop(workshopId){
        console.log(workshopId)
        try {
            const response = await baseAPI.delete(`workshops/${workshopId}`)
            return response.data.response
        } catch (error) {
            console.log(error)
            throw new Error(error.response ? error.response.data.message : error.message)
        }
    },
    async updateWorkshop(workshopId, newData){
        console.log(workshopId, newData)
        try {
            const response = await baseAPI.put(`workshops/${workshopId}`, newData)
            return response.data.response
        } catch (error) {
            console.log(error)
            throw new Error(error.response ? error.response.data.message : error.message)
        }
    }
}

export default workshopQueries