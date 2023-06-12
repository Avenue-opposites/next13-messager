'use client'

import axios from 'axios'
import { useState, useCallback } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import { toast } from 'react-hot-toast'
import { signIn, SignInResponse } from 'next-auth/react'

import type { FormDate } from '~/types'

import Input from '~/app/components/inputs/Input'
import Button from '~/app/components/Button'
import AuthSocialButton from './AuthSocialButton'

// 表示登录或注册
type Variant = 'LOGIN' | 'REGISTER'
type SocialAction = 'github' | 'google'

const AuthForm = () => {
  const [ variant, setVariant ] = useState<Variant>('LOGIN')
  const [ isLoading, setIsLoading ] = useState(false)

  const toggleVariant = useCallback(
    () => setVariant(
      variant === 'LOGIN' ? 'REGISTER' : 'LOGIN'
    ),
    [variant]
  )

  const { 
    register, 
    handleSubmit, 
    formState: { errors }
  } = useForm<FormDate>({
    defaultValues: {
      name: '',
      password: '',
      email: '',
    }
  })

  const onSubmit: SubmitHandler<FormDate> = (data) => {
    setIsLoading(true)

    // 登录
    if (variant === 'LOGIN') {
      // 凭证登录
      signIn('credentials',{
        ...data,
        redirect: false,
      })
      .then(signInThen)
      .finally(() => setIsLoading(false))
    }

    // 注册
    if (variant === 'REGISTER') {
      // 发送注册请求
      axios.post('/api/register', data)
        // 当请求成功时，会在页面上显示成功信息
        .then(() => toast.success('Registered successfully!'))
        //当捕获到错误时，会在页面上显示错误信息
        .catch((error) => {
          console.error(`${error.message} =>`, error)
          toast.error(`Registration failed! ${error.response.data}`)
        })
        .finally(() => setIsLoading(false))
        
    }
  }

  const socialAction = (action: SocialAction) => {
    setIsLoading(true)
    console.log("action",action);

    signIn(action,{ redirect: false })
    .then(signInThen)
    .finally(() => setIsLoading(false))
  }

  return (
    <div className="mt-4 w-full sm:mx-auto sm:max-w-md">
      <div 
        className="
        bg-white 
        px-4 py-8 
        shadow 
        rounded-lg
        "
      >
        <form 
          className="space-y-6" 
          onSubmit={handleSubmit(onSubmit)}
        >
          {variant === 'REGISTER' && (
            <Input  
              name="name" 
              label="Name" 
              disabled={isLoading}
              register={register} 
              errors={errors}
            />
          )}
          <Input  
            type="email"
            name="email" 
            label="Email address"
            disabled={isLoading} 
            register={register} 
            errors={errors}
          />
          <Input  
            type="password"
            name="password" 
            label="Password" 
            disabled={isLoading}
            register={register} 
            errors={errors}
          />
          <Button type="submit" disabled={isLoading} fullWidth>
            {variant === 'LOGIN' ? 'Sign in' : 'Register'}
          </Button>
          <div 
            data-tips="Or continue with"
            className="
              mt-6 pt-6
              relative 
              flex gap-2
              border-t 
              border-gray-200
              before:content-[attr(data-tips)]
              before:absolute
              before:left-1/2 before:-translate-x-1/2
              before:-top-3
              before:text-gray-500
              before:text-sm 
              before:bg-white
              before:px-2  
            "
          >
            <AuthSocialButton 
              icon={BsGithub} 
              onClick={() => socialAction('github')} 
            />
            <AuthSocialButton 
              icon={BsGoogle} 
              onClick={() => socialAction('google')} 
            />
          </div>
          <p 
            className="
              flex gap-2 justify-center
              text-sm text-gray-500
              mt-6 px-2
            "
          >
            {variant === 'LOGIN' ? 'New to React messenger?' : 'Already have an account?'}
            <span 
              className="underline cursor-pointer"
              onClick={toggleVariant}
            >
              {variant === 'LOGIN' ? 'create an account' : 'Login'}
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default AuthForm

function signInThen(response: SignInResponse | undefined) {
  const { error,ok } = response || {}
  console.log(response);
  
  if(error) {
    toast.error(error)
    return
  }

  if(ok) {
    toast.success('Logged in successfully!')
  }
}