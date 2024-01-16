import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"


import {auth} from '../fireBaseConfig'
import {createUserWithEmailAndPassword } from "firebase/auth";
import LoadingBtn from "../component/LoadingBtn";






function Sigin({location,setLocation}) {

  setLocation(window.location.pathname)
    const navigate = useNavigate()

    const [email, setEamil] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPass, setRepeatPas] = useState('')
    const [loading,isLoading] = useState(false)

    function getValue(e) {
      e.preventDefault()
      isLoading(true)
        if (password !== repeatPass) {
            alert('Password did\'nt matched')
            return
        }

        


createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
      const user = userCredential.user;
      isLoading(false)
      navigate('/login')
    // ...
  })
  .catch((error) => {
    
      const errorMessage = error.message;
    alert(errorMessage)
    isLoading(false)
    // ..
  });
        
    }

    return (
        <div className="flex items-center h-[80vh]">

            <form  onSubmit={(e)=>getValue(e) }  className="bg-white max-w-sm mx-auto border rounded-lg shadow-lg border-slate-400 p-10 w-full">
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" id="email"  value={email} onChange={(e)=> setEamil(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required/>
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" id="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
  </div>
  <div className="mb-5">
    <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
    <input type="password" id="repeat-password" value={repeatPass} onChange={(e)=> setRepeatPas(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
  </div>
  <div className="flex items-start mb-5">
    
     <Link to='/login' className="text-blue-600 hover:underline dark:text-blue-500">Already Have an account</Link>
          </div>
          {loading ? <LoadingBtn/>:

            <button type="submit" className=" text-white bg-blue-700 hover:bg-blue-800 
          focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium
           rounded-lg text-sm px-5 py-2.5 text-center"> Register new account</button>
          }
</form>


        </div>
    )
}

export default Sigin


