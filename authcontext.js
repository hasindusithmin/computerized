import { createContext, useEffect, useState } from "react"
import { hasCookie,getCookie } from 'cookies-next';
import jwt from "jsonwebtoken"

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [user,setUser] = useState(false)

    useEffect(()=>{

        if (hasCookie('jwt')) {
            const tkn = getCookie('jwt')
            jwt.verify(tkn,process.env.NEXT_PUBLIC_JWT,(err,dT)=>{
                if (dT) setUser(dT)
            })

        }
        

    },[])

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext;