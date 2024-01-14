
import { Link } from "react-router-dom"

function MainBtn({ btnName ,linkName,logout}) {
    return (
        <>
        {/* <div className="cursor-pointer"><Link to={`/${linkName}`}>{btnName}</Link></div> */}
        <div>
        {/* Eye-catching 3D-style effect on hover */}
        <Link className="text-white hover:text-gray-300 transition duration-300 transform hover:-translate-y-1 hover:shadow-md inline-block py-2 px-4 bg-indigo-600 rounded-md" to={`/${linkName}`}>{btnName}</Link>
            </div>
            </>
    )
}

export default MainBtn
