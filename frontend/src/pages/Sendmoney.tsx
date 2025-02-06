import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import { useSendMoneyMutation } from '../store/api/service';
import { Alert } from '../components/Alert';

const baseurl = import.meta.env.VITE_BACKEND_URL

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [pin,setPin] = useState(0)
    const [remarks,setRemarks] = useState("")


    const [userData] = useSendMoneyMutation()
    const navigate = useNavigate()
    const inputHandler = async ()=>{
        const response = await userData({
            to: id,
            balance:Number(amount),
            remarks:remarks,
            transactionPin:Number(pin)
        })


        if(response.data?.message == 'Transfer successful'){
            navigate("/");
            <Alert message='success' />
        }

    }

    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div className='py-4 underline'>
                <Link to={'/'}>Back</Link>
            </div>
            <div
                className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div className="flex flex-col space-y-1.5 p-6">
                <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-2xl text-white">{name?name[0].toUpperCase():""}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{name}</h3>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        onChange={(e:any) => {
                            setAmount(e.target.value);
                        }}
                        type="number"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"
                        required
                    />
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Enter Your Pin
                    </label>
                    <input
                        onChange={(e:any) => {
                            setPin(e.target.value);
                        }}
                        type="number"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="pin"
                        placeholder="Enter Pin"
                        required
                    />
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Remarks
                    </label>
                    <input
                        onChange={(e:any) => {
                            setRemarks(e.target.value);
                        }}
                        type="text"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="remarks"
                        placeholder="Rent"
                        required
                    />
                    
                    </div>
                    <button onClick={inputHandler} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                        Initiate Transfer
                    </button>
                </div>
                </div>
        </div>
      </div>
    </div>
}