import { createSlice,PayloadAction } from "@reduxjs/toolkit";



interface User {
    firstName: string |null;
    lastName:string|null;
  }
  
  

  const storedUser = localStorage.getItem("user");
  
  const initialState: User = storedUser ? JSON.parse(storedUser) :{
    firstName: null,
    lastName:null,
  };

const userSlice  = createSlice({
    name:"userSlice",
    initialState,
    reducers:{
        userInfo:(state,action:PayloadAction<User>)=>{
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            localStorage.removeItem("user")
            localStorage.setItem("user",JSON.stringify(action.payload))
        },

        logoutUser: (state) => {
          state.firstName = null;
          state.lastName = null;
          // Remove from localStorage
          localStorage.removeItem("user");
          localStorage.removeItem("token")
        },
    }
})

export const {userInfo,logoutUser} = userSlice.actions

export default userSlice.reducer