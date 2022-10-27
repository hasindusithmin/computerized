import { createContext, useEffect, useState } from "react"
import Cookies from 'js-cookie'
import jwt from "jsonwebtoken"

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [auth,setAuth] = useState(false)

    useEffect(()=>{

        const token = Cookies.get('jwt')
        if (token !== undefined) {
            jwt.verify(token,process.env.NEXT_PUBLIC_SECRET,(err,dT)=>{
                try {
                    if (err) throw err;
                    setAuth(true)
                } catch (error) {
                    console.log(error.message);
                }
            })
        }

    },[])

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext;