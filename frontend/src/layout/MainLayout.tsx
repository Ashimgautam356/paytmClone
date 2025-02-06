import { NavLink, Outlet } from "react-router-dom"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"


export const MainLayout = () => {
  return (
    <>  
        <Appbar></Appbar>
        <Balance></Balance>
        <div className="px-10">
            <Outlet></Outlet>
        </div>
    </>
  )
}
