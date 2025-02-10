
type cutomTypes = {
    success?:string,
    normal?:string
}

interface Proptypes {
  message: string,
  types: "success" | "normal"
}

const currentType:any ={
  success:"bg-green-300 text-white",
  normal:"bg-gray-700 text-white"
}
const defaultStyle ="w-[40%] p-4 flex justify-center items-center  text-2xl font-semibold py-6 rounded-xl"

export const Alert = ({message,types}:Proptypes) => {
  return (
    <div className="fixed p-10 top-0 left-0 w-screen flex justify-center items-start transition-transform duration-500 translate-y-0 opacity-100 animate-slide-down">
      <div className={`${defaultStyle} ${currentType[types]}`}>
          {message}
      </div>
      
    </div>
  )
}
