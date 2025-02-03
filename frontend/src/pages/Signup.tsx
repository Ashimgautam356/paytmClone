import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"


const baseurl = import.meta.env.VITE_BACKEND_URL

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={(e:any) => {
          setFirstName(e.target.value);
        }} placeholder="John" label={"First Name"} />
        <InputBox onChange={(e:any) => {
          setLastName(e.target.value);
        }} placeholder="Doe" label={"Last Name"} />
        <InputBox onChange={(e:any) => {
          setUsername(e.target.value);
        }} placeholder="ashim@gmail.com" label={"Email"} />
        <InputBox onChange={(e:any) => {
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async () => {
            const response = await axios.post(`${baseurl}/user/signup"`, {
              userName:username,
              firstName,
              lastName,
              password,
              amount:5000
            });
            if(response.data?.message =="signup sucessfull"){
              navigate("/signin")
            }
          }} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}