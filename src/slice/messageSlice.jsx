//       redux非同步使用     redux必用
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const messageSlice =  createSlice({
    name:'message',
    initialState:[
    ],
    reducers:{
        createMessage(state,action){
            // 成功
            if(action.payload.success){
                state.push({
                    id:action.payload.id, 
                    type:'success',
                    title:'成功',
                    text:action.payload.message
                })
            }else{
                // 失敗
                state.push({
                    id:action.payload.id, 
                    type:'danger',
                    title:'失敗',
                    text:Array.isArray(action.payload.message)
                    ? action.payload.message.join("、")
                    : action.payload.message
                })
            }
        },
        removeMessage(state,action){
            const index = state.findIndex(item => item === action.payload) //判斷若id為當前id
            state.splice(index,1);
        },
    }
}) 

// 使用createAsyncThunk觸發上方的createMessage 可以執行非同步(如：setTimeout)
export const createAsyncMessage = createAsyncThunk(
    'message/createAsyncMessage',
        //          傳入的值   上面的function
    async function (payload,{dispatch,requestId}){
        dispatch(messageSlice.actions.createMessage({
            ...payload,
            id:requestId,
        }))
        // 執行非同步
        setTimeout(() => {
            dispatch(messageSlice.actions.removeMessage(requestId))
        }, 2000);
    }
)
export const {createMessage} = messageSlice.actions;
export default messageSlice.reducer;