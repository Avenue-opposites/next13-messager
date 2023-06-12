import Image from 'next/image'
import AuthForm from './components/AuthForm'

export default function Home() {
  
  return (
    <div 
      className="
        flex items-center justify-center
        min-h-screen
        sm:px-6
        lg:px-8
      bg-gray-100
      "
    >
      <div 
        className="
          flex flex-col items-center 
          sm:mx-auto sm:w-full sm:max-w-md
        ">
        <Image 
          className=" 
            animate-[spin_3s_linear_infinite]
            sm:w-24 sm:h-24
            lg:w-28 lg:h-28
          "
          src="/images/logo.svg"
          width={64}
          height={64}
          alt="Logo" 
        />
        <h2 
          className="
            mt-2 
            text-center 
            text-3xl 
            font-bold
            tracking-tight
            text-black
          "
        >
          Sign in to your account
        </h2>
        {/* 验证表单 */}
        <AuthForm />
      </div>
    </div>
  )
}
  