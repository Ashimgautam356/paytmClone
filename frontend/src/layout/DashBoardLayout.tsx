import { Outlet } from "react-router-dom"
import { NavLink } from "react-router-dom"
export const DashBoardLayout = () => {
  return (
    <>
        <div className=" border-b border-yellow-400  p-4">
            <NavLink to={'../'} className={({isActive}) => isActive? "px-10 text-teal-400 font-bold" : "px-10"}>Users</NavLink>
            <NavLink to={'/my-statement'} className={({isActive}) => isActive? "px-10 text-teal-400 font-bold" : "px-10"}>View Statement</NavLink>
        </div>
        <Outlet></Outlet>
    </>
  )
}
