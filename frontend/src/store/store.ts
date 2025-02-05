import { configureStore } from "@reduxjs/toolkit";
import { serviceApi } from "./api/service";
import userReducer from './slice/userSlice'
export const store = configureStore({

  reducer: {
      [serviceApi.reducerPath]:serviceApi.reducer,
      user: userReducer
      },

      middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(serviceApi.middleware),
      });
    



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

