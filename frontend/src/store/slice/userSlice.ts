import { createSlice,PayloadAction } from "@reduxjs/toolkit";



interface User {
    firstName: string;
    balance: number;
  }

  const initialState: User = {
    firstName: "",
    balance:0
  };

const userSlice  = createSlice({
    name:"userSlice",
    initialState,
    reducers:{
        userInfo:(state,action:PayloadAction<{ firstName:string; balance: number }>)=>{
            state.firstName = action.payload.firstName
            state.balance = action.payload.balance
        }
    }
})

export const {userInfo} = userSlice.actions

export default userSlice.reducer