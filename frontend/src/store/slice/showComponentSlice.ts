import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";



const showComponentSlice = createSlice({
    name:"showCompenet",
    initialState:false, 
    reducers:{
        setComponent: (state, action: PayloadAction<boolean>) => {
            return action.payload; // Directly set state to the payload value
        },
    }
})


export const { setComponent } = showComponentSlice.actions;
export default showComponentSlice.reducer;