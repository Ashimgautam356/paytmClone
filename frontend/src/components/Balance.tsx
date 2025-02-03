import axios from "axios"
import { useEffect, useState } from "react"


const baseurl = import.meta.env.VITE_BACKEND_URL

export const Balance = () => {
    const [bal,setBal] = useState(0)
    useEffect(()=>{
        axios.get(`${baseurl}/account/balance"`,{headers:{token:localStorage.getItem("token")}}).then((response=>{
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