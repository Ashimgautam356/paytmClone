import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Users = ({myData}:{myData:(e:any)=>void}) => {
    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        const isToken = localStorage.getItem("token")
        console.log(isToken)
        if(!isToken){
            navigate("/signup")
        }
        axios.get("https://paytmclone-4t9l.onrender.com/api/v1/user/bulk?filter=" + filter,{headers:{token:localStorage.getItem('token')}})
            .then(response => {
                setUsers(response.data.user)
                myData(response.data.myProfile)
            })
    }, [filter])

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map((user:any) => <User user={user} key={user?._id}/>)}
        </div>
    </>
}

function User({user}:any) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={() => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} label={"Send Money"} />
        </div>
    </div>
}