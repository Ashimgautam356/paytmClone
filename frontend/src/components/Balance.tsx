
import { useState,useEffect } from "react"
import { useUserBalanceQuery } from "../store/api/service"
import { Alert } from "./Alert"



export const Balance = () => {
    const {data,isLoading} = useUserBalanceQuery(undefined,{
        pollingInterval:5000,
        skipPollingIfUnfocused:false    
    })

        const [lastBalance,setLastBalance] = useState<number|null>(null)
        const [notification,setNotification] = useState<boolean | null>(false)
        const [amountReceived, setAmountReceived] = useState<number|null>(null)
        useEffect(() => {
            if (data?.balance !== undefined) {
              if (lastBalance !== null && data.balance > lastBalance) {
                 setAmountReceived(data.balance - lastBalance);
                // Auto-hide notification after 5 seconds
                setNotification(true)
                setTimeout(() =>{
                    setNotification(false)
                }, 2500);
              }
              setLastBalance(data.balance);
            }
        }, [data?.balance])
        
   
      
    
  return <div className="flex p-4">
    {notification && <Alert types="success" message={`Rs ${amountReceived} has been credited!!`}></Alert>}
      <div className="font-semibold text-lg text-gray-400">
          Your Balance
      </div>
      <div className="font-semibold ml-4 text-lg text-gray-500">
          Rs {!isLoading? data?.balance:"loading!!" }
      </div>
  </div>
}