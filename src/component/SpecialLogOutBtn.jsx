import { signOut} from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../fireBaseConfig";
import { Button } from "@mui/material";
import { useContext } from "react";
import UserContext from "../Context/Context";
function SpecialLogOutBtn() {


  const {isUser,setIsUser} = useContext(UserContext)
    const navigate = useNavigate()
    function logout() {
    
        signOut(auth).then(() => {
          console.log('logout successfully');
          navigate('/login')
          setIsUser(false)
        }).catch((error) => {
          alert('Logout failed', ' ', error)
        });
      }


    return (
        
        <div>
 
        <Button color='inherit' onClick={logout} className="text-white hover:text-gray-300 transition duration-300 transform hover:-translate-y-1 hover:shadow-md inline-block py-2 px-4 bg-indigo-600 rounded-md" >Log out</Button>
            </div>
            
    )
}

export default SpecialLogOutBtn
