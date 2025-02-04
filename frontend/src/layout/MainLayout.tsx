import { NavLink, Outlet } from "react-router-dom"
import { Appbar } from "../components/Appbar"


export const MainLayout = () => {
  return (
    <>  
        <Appbar></Appbar>
        <div className=" border-b border-yellow-400 mt-11 p-4">
            <NavLink to={'../'} className={({isActive}) => isActive? "px-10 text-teal-400 font-bold" : "px-10"}>Users</NavLink>
            <NavLink to={'/my-statement'} className={({isActive}) => isActive? "px-10 text-teal-400 font-bold" : "px-10"}>View Statement</NavLink>
        </div>
        <div className="px-10">
            <Outlet></Outlet>
        </div>
    </>
  )
}
