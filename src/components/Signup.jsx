import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';    
import { auth, db } from '../firebase/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password:"",
    });

    const handleSignUp = async (e) => {
      e.preventDefault();
      const { email, password } = form;
      try{
        setLoading(true)
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        console.log(user);
        if(user) {
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            uName: form.name,
            password: form.password,
          });
        }
        console.log("user regitered successfully")
        toast.success("User Registered Successfully!!", {
          position: "top-center",
        });
        setLoading(false)
      } catch(err) {
        console.log(err.message)
        toast.error(err.message, {
          position: "bottom-center",
        });
        setLoading(false)
      }
    }

    return (
        <div className='w-full flex flex-col items-center mt-8'>
            <h1 className='text-xl font-bold'>Sign Up</h1>
            <div className='p-2 w-full md:w-1/3'>
                <div className='relative'>
                    <label htmlFor="message" className='leading-7 text-sm text-gray-300'>
                        Name
                    </label>
                    <input 
                    type='text'
                    id='message'
                    name='message'
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    required
                    className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                    />
                </div>
            </div>
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
                    required
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
                    required
                    className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                    />
                </div>
            </div>
            <div className='p-2 w-full'>
                <button onClick={handleSignUp} className='flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg'>
                    {loading ? <TailSpin height={25} color='white'/> : "Sign Up"}
                </button>
            </div>
            <div>
                <p>Already have an account? <Link to={'/login'}><span className='text-blue-500'>Login</span></Link></p>
            </div>
        </div>
    )
}

export default Signup