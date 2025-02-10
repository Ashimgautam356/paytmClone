import { useUserStatementQuery } from "../store/api/service"

export const Statement = () => {
    const{data} = useUserStatementQuery()

  return (
    <div className="">
        {
           data?.statement.length>0? data?.statement?.map((info:any,id:any)=>{return(
                <div className="border-r border-l  border-yellow-400 py-2 m-8 flex text-sm" key={id}>
                    {
                        info?.method == "Debit"?(<>
                            <p className="text-gray-400 px-4">{id+1}.</p>
                            <p className="text-red-400 px-4">{info.method}ed</p>
                            <p className="px-4">to:- {info?.to}</p>
                            <p className="px-4">ammout:- <span className="text-red-400">{info?.balance}</span></p>
                            <p className="text-gray-400 px-4">Remarks: <span className="text-black italic">{info?.remarks}</span></p>
                            <p className="text-gray-400 px-4"> {new Date(info?.createdAt).toLocaleString()}</p>
                        </>

                        ):(
                            <>
                            <p className="text-gray-400 px-4">{id+1}.</p>
                            <p className="text-green-400 px-4">{info.method}ed</p>
                            <p className="px-4">by:- {info?.to}</p>
                            <p className="px-4">ammout:- <span className="text-green-400">{info?.balance}</span></p>
                            <p className="text-gray-400 px-4">Remarks: <span className="text-black italic">{info?.remarks}</span></p>
                            <p className="text-gray-400 px-4"> {new Date(info?.createdAt).toLocaleString()}</p>
                            </>
                        )
                    }
                </div>
            )}): (<p className="mt-10 w-full text-center text-gray-400">No Statement Found!!!</p>)
        }
    </div>
  )
}
