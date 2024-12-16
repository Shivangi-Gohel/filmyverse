import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';    
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppState } from './Layout';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const useAppState = useContext(AppState);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [login, setLogin] = useState(false);
    const [form, setForm] = useState({
        email: "",  
        password:"",
    });
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    
    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = form;
        try{
            setLoading(true)
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in Successfully");
            toast.success("User Logged in Successfully", {
                position: "top-center"
            })
            setLogin(true);
        } catch(err) {
            console.log(err.message);
            toast.error(err.message, {
                position: "bottom-center",
            })
        } finally{
            setLoading(false)
        }
    };

    return (
        <div className='w-full flex flex-col items-center mt-8'>
            <h1 className='text-xl font-bold'>Login</h1>
            <div className='p-2 w-full md:w-1/3'>
                <div className='relative'>
                    <label htmlFor="message" className='leading-7 text-sm text-gray-300'>
                        Email
                    </label>
                    <input 
                    type='email'
                    id='message'
                    name='message'
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                    />
                </div>
            </div>
            <div className='p-2 w-full md:w-1/3'>
                <div className='relative'>
                    <label htmlFor="message" className='leading-7 text-sm text-gray-300'>
                        Password
                    </label>
                    <input 
                    type='password'
                    id='message'
                    name='message'
                    value={form.password}
                    onChange={(e) => setForm({...form, password: e.target.value})}
                    className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                    />
                </div>
            </div>
            <div className='p-2 w-full'>
                <button onClick={handleLogin} className='flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg'>
                    {loading ? <TailSpin height={25} color='white'/> : "Login"}
                </button>
            </div>
            <div>
                <p>Do not have account? <Link to={'/signup'}><span className='text-blue-500'>Sign Up</span></Link></p>
            </div>
        </div>
    )
}

export default Login
