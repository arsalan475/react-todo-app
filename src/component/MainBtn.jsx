
import { Button } from "@mui/material"

import { Link } from "react-router-dom"

function MainBtn({ btnName, linkName, logout, location,setLocation }) {
        
        

        function handleClick() {
               
                setLocation(window.location.pathname)
                
        }
    return (
        <>
       
        <div className="flex items-center gap-5">
                         
                         
                            {location === '/login'  ? '' : <Button onClick={handleClick} className="cursor-pointer" color="inherit"><Link to={`/login`}>LogIn</Link></Button>}
                            {location === '/register' ? '' : <Button onClick={handleClick} className="cursor-pointer" color="inherit"><Link to={`/register`}>Register</Link></Button>}
        
                            {/* <Button color="inherit">        
        <Link  to={`/${linkName}`}>{btnName}</Link>
                    </Button> */}
                    </div>
            </>
        
    )
}

export default MainBtn
