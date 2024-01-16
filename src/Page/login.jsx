import { onAuthStateChanged,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../fireBaseConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoadingBtn from "../component/LoadingBtn";





function Login({location,setLocation}) {

  setLocation(window.location.pathname)
  
  const navigate = useNavigate()

    const [email, setEamil] = useState('')
    const [password, setPassword] = useState('')
   const [loading,isLoading] = useState(false)
    

  function getValue(e) {
    e.preventDefault()
       isLoading(true)
 
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
isLoading(false)
        navigate('/todoApp')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
        isLoading(false)
      });
  

  }
 


return  <div className="flex items-center h-[60vh]" >


<form onSubmit={(e)=>getValue(e) } className="bg-white w-full max-w-sm mx-auto border rounded-lg shadow-lg border-slate-400 p-10">
<div className="mb-5">
<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
<input type="email" id="email" onChange={(e)=>setEamil(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required/>
</div>
<div className="mb-5">
<label htmlFor="password"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
<input type="password" id="password" onChange={(e)=>setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
</div>
<div className="flex items-start mb-5">
<div className="flex items-center h-5">
  <input id="remember" type="checkbox"  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required/>
</div>
<label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
</div>
{loading ? <LoadingBtn/>:

            <button type="submit" className=" text-white bg-blue-700 hover:bg-blue-800 
          focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium
           rounded-lg text-sm px-5 py-2.5 text-center"> Register new account</button>
          }
</form>

</div>
}

export default Login
