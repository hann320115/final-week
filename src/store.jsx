import { configureStore } from "@reduxjs/toolkit";    //建立store
import  messageReducer  from "./slice/messageSlice";  //取出slice
 

export const store = configureStore({
    reducer:{
        message: messageReducer,
    }
})