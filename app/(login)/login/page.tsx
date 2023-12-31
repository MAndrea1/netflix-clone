'use client'

import useAuth from "@/app/hooks/useAuth";
import Image from "next/image"
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  emailField: string,
  passwordField: string,
};

const Login = () => {
  const [ askLogin, setAskLogin] = useState(true)
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const { signUp, login, redirectToMain, user, userExists, error, setError } = useAuth()

  useEffect(() => {
    redirectToMain(user)
  }, [userExists])
  
  const onSubmit: SubmitHandler<Inputs> = async (data) =>{
    if (askLogin){
      await login(data.emailField, data.passwordField)
    }
    else {
      await signUp(data.emailField, data.passwordField)
    }
  }

  const toggleAskLogin = () => {
    setError('')
    setAskLogin(!askLogin)
  }

  // console.log(watch("emailField")) // watch input value by passing the name of it

  return (
    <>
      <main className="relative flex min-h-screen flex-col items-center md:justify-center">
        <Image 
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
          alt="Netflix logo" 
          width={90} 
          height={90}
          className="absolute top-0 left-0 cursor-pointer object-contain transition w-20 md:w-44 ml-[3%] mt-6"  // contain : resize image to fill the box whilst preserving its aspect-ratio.
        />
        <div className="mt-20 px-5 w-full md:w-[30rem] md:bg-black md:bg-opacity-80 md:p-20 md:mt-0">
          <form className="pb-5 md:pb-20" onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <legend className="text-3xl font-semibold">{askLogin ? "Sign in" : "Sign up"}</legend>
              <div className="flex flex-col my-8 space-y-4">
                <label>
                  <input type="email" placeholder="Email" className={`input w-full ${errors.emailField && "border-b-2 border-orange-500"}`} defaultValue={""}  {...register("emailField", { required: true })} />
                  {errors.emailField  && <div className="text-xs text-orange-500 mt-2">Please enter a valid email</div>}
                </label>
                <label>
                  <input type="password" placeholder="Password" className={`input w-full ${errors.emailField && "border-b-2 border-orange-500"}`} {...register("passwordField", { required: true })}/>
                  {errors.passwordField && <div className="text-xs text-orange-500 mt-2">Your password must contain between 4 and 60 characters.</div>}
                </label>
              </div>
              <button type="submit" className="nred py-4 px-3 font-semibold rounded md w-full">{askLogin ? "Sign in" : "Sign up"}</button>
              {error === "auth/invalid-login-credentials" && <div className="text-xs text-orange-500 mt-2">Invalid email or password</div>}              
              {error === "auth/email-already-in-use" && <div className="text-xs text-orange-500 mt-2">This email is already registered. <br/>Are you trying to <button className="underline" onClick={() => toggleAskLogin()}>log in</button>?</div>}              
              {error === "auth/weak-password" && <div className="text-xs text-orange-500 mt-2">Password should be at least 6 characters</div>}                           
            </fieldset>
          </form>
        <div className="text-sm text-stone-400">
          <span>{askLogin ? "New to Netflix? " : "Already have an account? "}</span>
          <button className="text-white hover:underline" onClick={() => toggleAskLogin()}>{askLogin ? "Sign up now" : "Log in"}</button>
        </div>
        </div>
        <Image 
          src={"https://assets.nflxext.com/ffe/siteui/vlv3/ab180a27-b661-44d7-a6d9-940cb32f2f4a/700e342e-c5c5-4f38-9afc-7bbc0b1e25d5/AR-es-20231009-popsignuptwoweeks-perspective_alpha_website_small.jpg"} 
          alt={""}
          fill
          className="hidden -z-10 opacity-50 md:flex"
          style={{
            objectFit: 'cover',
          }}>
        </Image>
      </main>
    </>
  )
}

export default Login