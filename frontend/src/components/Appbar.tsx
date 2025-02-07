import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { logoutUser } from "../store/slice/userSlice"
import { UseDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"


export const Appbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector((state: any) => state.user)
    const handleClick = async()=>{
        dispatch(logoutUser())
        navigate('/signin')

    }
    return <div className="shadow h-14 flex justify-between">
        <div className="flex items-center justify-center h-full ml-4 text-xl font-semibold">
            <Link to={"/"}><span className="text-red-400">Pay</span><span className="text-teal-400">TM</span><span className="text-yellow-400"> App</span></Link>
        </div>
        <div className="flex">
            <div className="flex pr-10 text-sm">

                <div className="flex flex-col justify-center h-full mr-4 ">
                    <Link to={`/user/update`}>Update Info</Link>
                </div>
                <div className="flex flex-col justify-center h-full mr-4 ">
                    <button onClick={handleClick} className="cursor-pointer">log out</button>
                </div>
            </div>
            <div className="flex flex-col justify-center h-full mr-4 uppercase font-semibold">
                {user?.firstName}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl cursor-pointer">
                    U
                </div>
            </div>
        </div>
    </div>
}