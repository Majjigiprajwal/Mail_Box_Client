import React from 'react';
import {useState} from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


const Signin = () => {

  const navigate = useNavigate();

  const [user,setUser] = useState({
    email:"",
    password :""
  })
  
  const handleChange = (e)=>{
      setUser({
        ...user,
        [e.target.name]:e.target.value
      })
      
  }


  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(user.email.trim()==="" || user.password.trim()===""){
      toast.error('Fill all the details', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        return
    }
    try{
      let response = await axios.post('http://localhost:4000/login',user)
      toast.success("Login Succesful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      window.localStorage.setItem('token',JSON.stringify(response.data.token))  
    
      navigate("/mail");
    }
    catch(error){
     if(error?.response?.status === 401){
        toast.error(error?.response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          return
      }
      else{
        toast.error(error?.response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          return
      }
    }
  }
  return (
    <>
    <div className="bg-slate-900 flex min-h-full  flex-1 flex-col h-screen items-center justify-center   px-6 py-12 lg:px-8 border border-solid border-gray-400 p-4">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-500 mb:text-2xl mb:mb-5 font-serif ">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm mb:w-full">
          <form className="space-y-6 text-lg mb:text-lg" onSubmit={(e)=>{handleSubmit(e)}} >
            <div>
              <label htmlFor="email" className="block  font-bold leading-6 text-red-500 mb:text-xl font-serif ">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e)=>{
                    handleChange(e)
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1 px-1.5 text-lg font-medium text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 mb:text-xl"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block  font-bold leading-6 text-red-500 mb:text-xl font-serif ">
                  Password
                </label>
                <div className="mb:text-right mb:text-xs text-sm font-serif ">
                  <button className="font-semibold text-red-500 hover:text-white cursor-pointer" onClick={()=>navigate('/sendMail')}>
                    Forgot password?
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e)=>{
                    handleChange(e)
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1 px-1.5 text-black text-lg shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 mb:text-xl"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-lg font-semibold leading-6 text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mb:text-xl font-serif "
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-white font-serif ">
         Don't have an account? {' '}
            <button  className="font-semibold leading-6 text-red-500 hover:text-white  cursor-pointer font-serif " onClick={()=>navigate('/')} >
              Signup
            </button>
          </p>
        </div>
      </div>
    </>
  )
}

export default Signin
