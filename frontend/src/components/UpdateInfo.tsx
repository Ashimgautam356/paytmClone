import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateInfoMutation } from '../store/api/service';
import {userInfo} from '../store/slice/userSlice'


const userSchema = z.object({
    firstName: z.string()
      .min(3, { message: "Min length should be 3" })
      .max(10, { message: "Max length should be 10" })
      .optional()
      .or(z.literal("")),

    lastName: z.string()
      .min(3, { message: "Min length should be 3" })
      .max(10, { message: "Max length should be 10" })
      .optional()
      .or(z.literal("")),

    oldPassword: z.string()
      .min(6, { message: "Old password must be at least 6 characters" })
      .optional()
      .or(z.literal("")),

    newPassword: z.string()
      .optional()
      .refine((val) => !val || val.length >= 6, {
        message: "New password must be at least 6 characters",
      }),
  })
  .refine((data) => Object.values(data).some((value) => value && value !== ""), {
    message: "At least one field must be updated",
  });


type FormField = z.infer<typeof userSchema>


export const UpdateInfo = () => {
  const user = useSelector((state:any) => state.user)


    const {register,handleSubmit,formState:{errors,isSubmitting},setError} = useForm<FormField>({
        resolver: zodResolver(userSchema),
        defaultValues:{
          firstName:user.firstName,
          lastName:user.lastName
        }
    })

    const dispatch = useDispatch()

    const [updateInfo, { isLoading }] = useUpdateInfoMutation()

    const onSubmit:SubmitHandler<FormField> = async(data:any)=>{
        try {
            const result = await updateInfo(data).unwrap();
            dispatch(userInfo({
               firstName: result.data?.firstName ,
                lastName: result.data?.lastName, 
              }));

            alert("Information updated successfully!");
        } catch (error: any) {
            setError("root", { message: error?.data?.message || "Something went wrong!" });
        }
    }
  return (
    <div className='p-4 flex flex-col mt-10 '>
        <div className='w-full '>
            <p className='text-xl text-gray-600 font-semibold text-center'>Update Information !</p>
        </div>
        <div className='mt-4 w-full flex justify-center items-center '>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-white shadow-lg rounded-xl p-2 flex flex-col'>
                <div className='my-4 flex justify-between items-center'>
                    <label htmlFor="firstName" className='px-4'>First Name: </label>
                    <input defaultValue={user?.firstName} {...register("firstName")} className='border-b border-black p-2'type='text' />
                    {errors.firstName && <p className='text-red-500 text-xs pl-4 ' >{errors.firstName?.message}</p>}
                </div>
                <div className='my-4 flex justify-between items-center'>
                    <label htmlFor="lastName" className='px-4'>Last Name: </label>
                    <input defaultValue={user?.lastName} {...register("lastName")} className='border-b border-black p-2' type='text' />     
                    
                </div>
                <div className='w-full mt-4 flex justify-center items-center text-gray-400'>
                    <p>change password</p>
                </div>
                <div className='m2-4 flex justify-between items-center'>
                    <label htmlFor="new Password" className='px-4'>New Password: </label>
                    <input {...register("newPassword")} placeholder='new Password'className='border-b border-black p-2' type='password'/>
                </div>
                <div className='my-4 flex justify-between items-center'>
                    <label htmlFor="old Password" className='px-4'>Old Password: </label>
                    <input {...register("oldPassword")} placeholder='old Password' className='border-b border-black p-2' type='password' />
                </div>

                {errors.root && <p className="text-red-500 text-center">{errors.root.message}</p>}

                <div className='my-4 flex justify-center items-center w-full'>
                <button 
              type="submit" 
              className="py-2 w-[70%] text-white font-semibold rounded-lg cursor-pointer bg-green-400 disabled:opacity-50"
              disabled={isSubmitting || isLoading}
            >
              {isLoading ? "Updating..." : "Update Info"}
            </button>
                </div>
            </form>
        </div>
    </div>
  )
}
