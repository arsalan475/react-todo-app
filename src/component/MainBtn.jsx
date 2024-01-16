
import { Button } from "@mui/material"

import { Link } from "react-router-dom"

function MainBtn({ btnName ,linkName,logout}) {
    return (
        <>
        {/* <div className="cursor-pointer"><Link to={`/${linkName}`}>{btnName}</Link></div> */}
        <div>
                {/* Eye-catching 3D-style effect on hover */}
                <Button color="inherit">        
        <Link  to={`/${linkName}`}>{btnName}</Link>
                    </Button>
                    </div>
            </>
        
    )
}

export default MainBtn
