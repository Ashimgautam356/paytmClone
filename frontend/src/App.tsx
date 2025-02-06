import { BrowserRouter as Router, Routes,Route } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { SendMoney } from "./pages/Sendmoney"
import { MainLayout } from "./layout/MainLayout.tsx"
import { Users } from "./components/Users.tsx"
import { Statement } from "./components/Statement.tsx"
import { UpdateInfo } from "./components/UpdateInfo.tsx"
import { DashBoardLayout } from "./layout/DashBoardLayout.tsx"
export const App = () => {
  return (
        <Router>
          <Routes>
            <Route path="/signup" element={<Signup></Signup>}></Route>
            <Route path="/signin" element={<Signin></Signin>}></Route>
            
            <Route path="/" element={<MainLayout></MainLayout>}>
              <Route element={<DashBoardLayout></DashBoardLayout>} >
                <Route  element={<Users></Users>} index></Route>
                <Route path="my-statement" element={<Statement></Statement>} ></Route>
              </Route>
              
              <Route path="user/update" element={<UpdateInfo></UpdateInfo>}></Route>
              
            </Route>
              <Route path="/send" element={<SendMoney></SendMoney>}></Route>

          </Routes>

        </Router>
  )
}
