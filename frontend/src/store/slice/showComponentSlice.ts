import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";



const showComponentSlice = createSlice({
    name:"showCompenet",
    initialState:{value:false}, 
    reducers:{
        setComponent: (state,action: PayloadAction<boolean>) => {
            state.value = action.payload
        },
    }
})


export const { setComponent } = showComponentSlice.actions;
export default showComponentSlice.reducer;