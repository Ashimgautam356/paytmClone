import { useEffect } from "react"

export const Statement = () => {
    const data = [
        {userId:"asdfasdf234er2",method:"Debit",to:"asdfasdf23424",remarks:"one",balance:50,createdAt:"2025-02-04T17:51:43.387Z"},
        {userId:"asdfasdf234er2",method:"Credit",to:"asdfasdf23424",remarks:"one",balance:50,createdAt:"2025-02-04T17:51:43.387Z"},
        {userId:"asdfasdf234er2",method:"Credit",to:"asdfasdf23424",remarks:"one",balance:50,createdAt:"2025-02-04T17:51:43.387Z"},
    
    ]
  return (
    <div className="">
        {
            data.map((info,id)=>{return(
                <div className="border-r border-l  border-yellow-400 py-2 m-8 flex text-sm" key={id}>
                    {
                        info?.method == "Debit"?(<>
                            <p className="text-gray-400 px-4">{id+1}.</p>
                            <p className="px-4">{info?.userId}</p>
                            <p className="text-red-400 px-4">{info.method}ed</p>
                            <p className="px-4">to:- {info?.to}</p>
                            <p className="px-4">ammout:- <span className="text-red-400">{info?.balance}</span></p>
                            <p className="text-gray-400 px-4"> {new Date(info?.createdAt).toLocaleString()}</p>
                        </>

                        ):(
                            <>
                            <p className="text-gray-400 px-4">{id+1}.</p>
                            <p className="px-4">{info?.userId}</p>
                            <p className="text-green-400 px-4">{info.method}ed</p>
                            <p className="px-4">by:- {info?.to}</p>
                            <p className="px-4">ammout:- <span className="text-green-400">{info?.balance}</span></p>
                            <p className="text-gray-400 px-4"> {new Date(info?.createdAt).toLocaleString()}</p>
                            </>
                        )
                    }
                </div>
            )})
        }
    </div>
  )
}
