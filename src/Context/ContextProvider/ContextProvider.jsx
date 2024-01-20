import { useState } from "react"
import UserContext from "../Context"

function ContextProvider({ children }) {
    const [isUser, setIsUser] = useState(false)
    
    return (
        <UserContext.Provider value={{ isUser, setIsUser }}>
            {children}
       </UserContext.Provider>
    )
}

export default ContextProvider
