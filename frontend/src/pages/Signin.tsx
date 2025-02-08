import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import {  useNavigate } from "react-router-dom"
import { useUserSigninMutation } from "../store/api/service"
import { useDispatch } from "react-redux"
import { userInfo} from "../store/slice/userSlice"
import { SubmitHandler, useForm } from "react-hook-form"
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { BottomWarning } from "../components/BottomWarning"


const userInput = z.object({
  email: z.string().email(),
  password:z.string().min(6)
})

type FormField = z.infer<typeof userInput>

export const Signin = () => {

    
    const navigate = useNavigate();

    const {register,handleSubmit,formState:{errors,isSubmitting},setError} = useForm<FormField>({
      resolver:zodResolver(userInput)
    })


    const[newUser,{isLoading}]= useUserSigninMutation()
    const dispatch = useDispatch()

    const onSubmit:SubmitHandler<FormField> = async(data:any)=>{

      try{
        const response = await newUser({
          userName:data.email,
          password:data.password
        }).unwrap();
        if(response?.message == "login sucessfull"){
         const firstName = response?.firstName
         const lastName = response?.lastName
   
           localStorage.setItem("token", response?.token)
           dispatch(userInfo({firstName,lastName}))
           navigate("/")
        }
      }catch(err:any){
        setError("root", { message: err?.data?.message || "Something went wrong!" });
      }
      


 }
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-start  text-sm">
            <label htmlFor="email" className="font-semibold">Email</label>
            <input type="text" {...register("email")} placeholder="ashim@gmail.com" className="w-full p-2 my-1 border font-medium border-gray-300 rounded-md"/>
            {errors.email && <p className='text-red-500 text-xs mb-4 ' >{errors.email?.message}</p>}

          </div>
          <div className="flex flex-col items-start  text-sm">
            <label htmlFor="password" className="font-semibold" >Password</label>
            <input type="text" {...register("password")} placeholder="123456" className="w-full p-2 my-1 border font-medium border-gray-300 rounded-md"/>
          {errors.password && <p className='text-red-500 text-xs mb-4 ' >{errors.password?.message}</p>}

          </div>
          {errors.root && <p className='text-red-500 text-sm text-left ' >{errors.root?.message}</p>}
          {isLoading?(
            <button type="submit" className="w-full text-white bg-gray-400 hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-8 cursor-wait" disabled={true}>Loading!!!</button>
          ):(
            <button type="submit" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-8 cursor-pointer" >{isSubmitting? "Loading" :"Sign in"}</button>
          )}
          
        </form>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}

