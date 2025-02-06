import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import {  useNavigate } from "react-router-dom"
import { useState } from "react"
import { useUserSigninMutation } from "../store/api/service"
import { useDispatch } from "react-redux"
import { userInfo } from "../store/slice/userSlice"



export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();


    const[newUser]= useUserSigninMutation()
    const dispatch = useDispatch()
    const handleSubmit = async()=>{
      const response = await newUser({
       userName:username,
       password
     });

     if(response?.data?.message == "login sucessfull"){
      const firstName = response?.data?.firstName
      const balance = response?.data?.balance
      const userId = response?.data?.userId
      const lastName = response?.data?.lastName
        localStorage.setItem("token", response.data.token)
        dispatch(userInfo({firstName,lastName,balance,userId}))
        
        navigate("/")
     }
 }
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={(e:any) => {
          setUsername(e.target.value);
        }} placeholder="ashim@gmail.com" label={"Email"} />
        <InputBox onChange={(e:any) => {
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={handleSubmit} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}

