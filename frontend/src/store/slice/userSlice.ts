import { createSlice,PayloadAction } from "@reduxjs/toolkit";



interface User {
    firstName: string;
    lastName:string;
    balance: number;
    userId:string
  }

  const initialState: User = {
    firstName: "",
    lastName:"",
    balance:0,
    userId:"",
  };

const userSlice  = createSlice({
    name:"userSlice",
    initialState,
    reducers:{
        userInfo:(state,action:PayloadAction<{ firstName:string,lastName:string, balance: number,userId:string, }>)=>{
            state.firstName = action.payload.firstName
            state.balance = action.payload.balance
            state.userId = action.payload.userId
            state.lastName = action.payload.lastName
        }
    }
})

export const {userInfo} = userSlice.actions

export default userSlice.reducer