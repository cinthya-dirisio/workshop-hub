import { createReducer } from "@reduxjs/toolkit";
import userActions from "../actions/userActions";

const initialStore = {
    user: null,
    token: null
}
const userReducer = createReducer( initialStore, (builder) =>{
    builder.addCase( userActions.login, (state, action) =>{
        const newStore = {...state}
        newStore.user = action.payload.user
        newStore.token = action.payload.token
        return newStore
    } )
    .addCase( userActions.logout, (state, action)=>{
        return initialStore
    })
    .addCase( userActions.update, (state, action) =>{
        const newStore = {...state}
        const newData = {...action.payload.user}
        newStore.user = {...newStore.user, ...newData.user.data }
        return newStore
    } )
})

export default userReducer