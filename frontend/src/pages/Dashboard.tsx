import { useState } from "react"
import { Appbar } from "../components/Appbar.tsx"
import { Balance } from "../components/Balance.tsx"
import { Users } from "../components/Users.tsx"

export const Dashboard = () => {
    const [myData, setMyData] = useState<any>({})
    return <div>
        <Appbar value={myData[0]?.firstName}/>
        <div className="m-8">
            <Balance/>
            <Users myData={setMyData}/>
        </div>
    </div>
}