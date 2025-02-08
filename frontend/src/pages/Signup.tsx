import { BottomWarning } from "../components/BottomWarning"
import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom"
import { useUserSignupMutation } from "../store/api/service"
import { SubmitHandler, useForm } from "react-hook-form"
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"


const userSignup = z.object({
  firstName:z.string().min(2).max(10),
  lastName:z.string().min(2).max(15).optional(),
  userName: z.string().email(),
  password:z.string().min(6),
  pin:z.string().min(1).max(6)
})

type FormField = z.infer<typeof userSignup>

export const Signup = () => {
 
   const [newUser] = useUserSignupMutation()
    const navigate = useNavigate();

    const {register,handleSubmit,formState:{errors,isSubmitting},setError} = useForm<FormField>({
      resolver:zodResolver(userSignup)
    })
    const onSubmit:SubmitHandler<FormField> = async(data:any)=>{
    
          try{
            const response = await newUser({
              userName:data.userName,
              firstName: data.firstName,
              lastName:data.lastName,
              password:data.password,
              amount:5000,
              transactionPin:Number(data.pin)

            }).unwrap();
              console.log(response)
            if(response?.message =="signup sucessfull"){
              navigate("/signin")
            }
          }catch(err:any){
            setError("root", { message: err?.data?.message || "Something went wrong!" });
          }
        }

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-start  text-sm">
            <label htmlFor="firstName" className="font-semibold">First Name</label>
            <input type="text" {...register("firstName")} placeholder="Jhon" className="w-full p-2 my-1 border font-medium border-gray-300 rounded-md"/>
            {errors.firstName && <p className='text-red-500 text-xs mb-4 ' >{errors.firstName?.message}</p>}

          </div>
          <div className="flex flex-col items-start  text-sm">
            <label htmlFor="lastName" className="font-semibold">Last Name</label>
            <input type="text" {...register("lastName")} placeholder="Doe" className="w-full p-2 my-1 border font-medium border-gray-300 rounded-md"/>
            {errors.lastName && <p className='text-red-500 text-xs mb-4 ' >{errors.lastName?.message}</p>}

          </div>
          <div className="flex flex-col items-start  text-sm">
            <label htmlFor="email" className="font-semibold">Email</label>
            <input type="text" {...register("userName")} placeholder="ashim@gmail.com" className="w-full p-2 my-1 border font-medium border-gray-300 rounded-md"/>
            {errors.userName && <p className='text-red-500 text-xs mb-4 ' >{errors.userName?.message}</p>}

          </div>
          <div className="flex flex-col items-start  text-sm">
            <label htmlFor="password" className="font-semibold">Password</label>
            <input type="text" {...register("password")} placeholder="12asdfc" className="w-full p-2 my-1 border font-medium border-gray-300 rounded-md"/>
            {errors.password && <p className='text-red-500 text-xs mb-4 ' >{errors.password?.message}</p>}

          </div>
          <div className="flex flex-col items-start  text-sm">
            <label htmlFor="pin" className="font-semibold">Transaction Pin</label>
            <input type="text" {...register("pin")} placeholder="123456" className="w-full p-2 my-1 border font-medium border-gray-300 rounded-md"/>
            {errors.pin && <p className='text-red-500 text-xs mb-4 ' >{errors.pin?.message}</p>}

          </div>
          {errors.root && <p className='text-red-500 text-sm text-left ' >{errors.root?.message}</p>}

          <div className="pt-4">
          <button type="submit" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-8" disabled={isSubmitting}>{isSubmitting? "Loading" :"Sign up"}</button>
          </div>
        </form>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}