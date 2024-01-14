import { Link, useParams } from "react-router-dom"
import MainBtn from "./MainBtn"
import { useState } from "react"
import SpecialLogOutBtn from "./SpecialLogOutBtn"


function Nav({location,setLocation}) {

  

console.log(location)
 
  return (<>
    

    <nav className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 p-4 shadow-2xl">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Branding */}
        
        <Link className="text-white text-lg font-semibold" to='/'>HOME</Link>
        {/* Login Link */}
        {location === '/register' ? <MainBtn btnName={'LogIn'} linkName={'login'} />
          : location === '/login' ? <MainBtn btnName={'Register'} linkName={'register'} /> : location === '/todoApp' ? <SpecialLogOutBtn/> : <MainBtn btnName={'Register'} linkName={'register'} />}
      </div>
    </nav>
    
   
    </>
  )
}

export default Nav
