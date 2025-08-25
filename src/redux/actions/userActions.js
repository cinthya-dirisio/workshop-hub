import { createAction } from "@reduxjs/toolkit";

const userActions = {
    login: createAction('login', (data) => {
        return {
            payload: {
                user: data.data,
                token: data.token
            }
        }
    }
    ),
    logout : createAction('logout', ()=>{
        return {
            payload : {}
        }
    }),
    register : createAction('register', (data)=>{
        return {
            payload: {
                user: data
            }
        }
    }),
    update: createAction('update', (data)=>{
        return {
            payload:{
                user: data
            }
        }
    })
}

export default userActions