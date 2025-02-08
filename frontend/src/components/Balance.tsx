
import { useUserBalanceQuery } from "../store/api/service"



export const Balance = () => {
    const {data} = useUserBalanceQuery()
    
  return <div className="flex p-4">
      <div className="font-semibold text-lg text-gray-400">
          Your Balance
      </div>
      <div className="font-semibold ml-4 text-lg text-gray-500">
          Rs {data?.balance }
      </div>
  </div>
}