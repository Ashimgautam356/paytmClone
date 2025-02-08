import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useSendMoneyMutation } from '../store/api/service';
import { Alert } from '../components/Alert';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod'


const UserInput = z.object({
    remarks: z.string().optional(),
    amount: z.string().min(1).max(10000),
    pin: z.string().min(1).max(999999)
})


type formField = z.infer<typeof UserInput>

export const SendMoney = () => {
const [searchParams] = useSearchParams();
const id = searchParams.get("id");
const name = searchParams.get("name");



const [userData,{isLoading}] = useSendMoneyMutation()
const navigate = useNavigate()

const { register, handleSubmit, formState: { errors, isSubmitting}, setError } = useForm<formField>({
    resolver: zodResolver(UserInput)
})

const onSubmit: SubmitHandler<formField> = async (data: any) => {

    try{
        const response = await userData({
            to: id,
            balance: Number(data.amount),
            remarks: data.remarks,
            transactionPin: Number(data.pin)
        }).unwrap()

        console.log(response)
        if (response?.message == 'Transfer successful') {
            navigate("/");
            <Alert message='success' />
        }
    }catch(err:any){
        console.log(err)
        setError("root",{ message:`${err?.data?.message} ${err?.data.accountStatus?err?.data.accountStatus:""} ${err?.data?.attemptRemeaning ?err?.data?.attemptRemeaning:''}` ||  "Something went wrong!"} )
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
            <div className="flex flex-col space-y-1.5 px-6 py-4">
                <h2 className="text-3xl font-bold text-center">Send Money</h2>
            </div>
            <div className="px-6 py-2">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-2xl text-white">{name ? name[0].toUpperCase() : ""}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{name}</h3>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <form onSubmit={handleSubmit(onSubmit)}  className='py-4'>
                            <div className="flex flex-col items-start  text-sm py-3">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Amount (in Rs)
                                </label>
                                <input
                                    {...register("amount")}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                />
                                {errors.amount && <p className='text-red-500 text-xs mb-4 ' >{errors.amount?.message}</p>}

                            </div>
                            <div className="flex flex-col items-start  text-sm  py-1">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Enter Your Pin
                                </label>
                                <input
                                    {...register("pin")}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="pin"
                                    placeholder="Enter Pin"
                                />
    {                           errors.pin && <p className='text-red-500 text-xs mb-4 ' >{errors.pin?.message}</p>}

                            </div>
                            <div className="flex flex-col items-start  text-sm  pt-4">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Remarks
                                </label>
                                <input
                                    {...register("remarks")}
                                    type="text"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="remarks"
                                    placeholder="Rent"
                                />
                                {errors.remarks && <p className='text-red-500 text-xs mb-4 ' >{errors.remarks?.message}</p>}

                            </div>

                            {errors.root && <p className='text-red-500 text-s w-full text-center mt-4  ' >{errors.root?.message}</p>}
                            {!isLoading?<button type='submit' className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white mt-4 cursor-pointer" disabled={isSubmitting || isLoading }>
                               {isLoading?"loading" :"Initiate Transfer"}
                            </button>:<button type='submit' className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-200 text-white mt-4 cursor-wait" disabled={isSubmitting || isLoading }>
                               {isLoading?"loading" :"Initiate Transfer"}
                            </button>}


                        </form>




                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
}