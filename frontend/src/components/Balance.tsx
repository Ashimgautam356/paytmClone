import axios from "axios"
import { useEffect, useState } from "react"

export const Balance = () => {
    const [bal,setBal] = useState(0)
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{headers:{token:localStorage.getItem("token")}}).then((response=>{
            setBal(response.data.balance)
        }))
    },[])

  return <div className="flex">
      <div className="font-bold text-lg">
          Your balance
      </div>
      <div className="font-semibold ml-4 text-lg">
          Rs {bal}
      </div>
  </div>
}