import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";


const options = {
    reducer : {
        user: userReducer
    }
}

const store = configureStore( options )
export default store