import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../store/api/service";


export const Users = () => {
    // Replace with backend call
    const [filter, setFilter] = useState("");
    const navigate = useNavigate()

    const {data,isLoading,error,isError} = useGetUsersQuery(filter)
    
    useEffect(() => {
        const isToken = localStorage.getItem("token")
        if(!isToken){
            navigate("/signup")
        }
    }, [filter])

    return <>
        <div className="my-2  mt-6">
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {data?.user.map((user:any) => <User user={user} key={user?._id}/>)}
        </div>
    </> 
}

function User({user}:any) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex justify-center items-center">
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

        <div className="flex flex-col justify-center h-full">
            <button onClick={() => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-8">Send Money</button>
        </div>
    </div>
}