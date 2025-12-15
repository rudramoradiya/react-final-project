import React,{useEffect, useState} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import { login } from '../store/authSlice'
import {Button,Input,Logo} from './index'
import {useDispatch} from 'react-redux'
import authService from '../appWrite/auth'
import { set, useForm } from 'react-hook-form'

function SignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()  
    const {register,handleSubmit} = useForm()
    const [error,setError] = useState('')

    const create=async(data)=>{
        setError('') // to clean the error message before new signup attempt 
        
        try {
            const userData= await authService.createAccount(data)
            if(userData){
                const userData=await authService.getCurrentUser()
                if(userData){
                    dispatch(login(userData))
                    navigate('/')
                }
            }
            

        } catch (error) {
            setError(error.message)
        }
    }   







    return (
         <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4 py-12">
            <div className={`mx-auto w-full max-w-lg bg-white shadow-xl rounded-2xl p-10 border border-slate-200`}>
            <div className="mb-6 flex justify-center">
                    <span className="inline-block w-full max-w-[120px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-3xl font-semibold text-slate-900 leading-tight">Sign up to create account</h2>
                <p className="mt-3 text-center text-base text-slate-600">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-semibold text-primary transition-colors duration-200 hover:text-primary/80"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-6 text-center text-sm font-medium">{error}</p>}

                <form onSubmit={handleSubmit(create)} className="mt-8">
                    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                        <Button type="submit" className="w-full transition-transform duration-200 hover:translate-y-[-1px]">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

    </div>
        
    )
}

export default SignUp

