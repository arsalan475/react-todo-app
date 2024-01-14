import { signOut} from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth,db } from "../fireBaseConfig";
function SpecialLogOutBtn() {
    const navigate = useNavigate()
    function logout() {
    
        signOut(auth).then(() => {
          console.log('logout successfully');
          navigate('/login')
        }).catch((error) => {
          alert('Logout failed', ' ', error)
        });
      }


    return (
        
        <div>
 
        <button onClick={logout} className="text-white hover:text-gray-300 transition duration-300 transform hover:-translate-y-1 hover:shadow-md inline-block py-2 px-4 bg-indigo-600 rounded-md" >LogOut</button>
            </div>
            
    )
}

export default SpecialLogOutBtn
