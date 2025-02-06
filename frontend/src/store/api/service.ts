import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store";

export const serviceApi = createApi({
    reducerPath:"serviceApi",
    baseQuery:fetchBaseQuery({
        baseUrl:`${import.meta.env.VITE_BACKEND_URL}`,
        prepareHeaders:(headers,{getState})=>{
            const token = localStorage.getItem('token'); // Get token from Redux state
      
            if (token) {
              headers.set('token', token); // Attach token to request
            }
      
            return headers;
        }
    }),
    endpoints: (builder)=>({

        // use query for the get and mutation for the update,delete and post
        
        // getting all the user's bulk
        getUsers: builder.query<any,any>({
            query:(filter)=> `/user/bulk?filter=${filter}`,
        }),

        // signup users
        userSignup: builder.mutation({
            query:(newUser)=>({
                url:'user/signup',
                method: 'POST',
                body:newUser,
            })
        }),


        // signup users
        userSignin: builder.mutation({
            query:(userData)=>({
                url:'user/signin',
                method: 'POST',
                body:userData,
            })
        }),


        // view Statement
        userStatement: builder.query<any,void>({
            query:()=> '/account/statement'
        }),

        // get balance
        userBalance: builder.query<any,void>({
            query: ()=> '/account/balance'
        }),

        // transfer Money
        sendMoney: builder.mutation({
            query:(userData)=>({
                url:'/account/transfer',
                method: 'POST',
                body:userData,
            })
        }),

        updateInfo: builder.mutation({
            query: (userData)=>({
                url:'user/update',
                method: 'PATCH',
                body:userData
            })
        })


    })

})

export const {useGetUsersQuery,useUserSignupMutation,useUserSigninMutation,useUserStatementQuery,useUserBalanceQuery,useSendMoneyMutation,useUpdateInfoMutation} = serviceApi

