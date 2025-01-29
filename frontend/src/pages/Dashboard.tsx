import { Appbar } from "../components/Appbar.tsx"
import { Balance } from "../components/Balance.tsx"
import { Users } from "../components/Users.tsx"

export const Dashboard = () => {
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={"10,000"} />
            <Users />
        </div>
    </div>
}