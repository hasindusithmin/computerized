import { createContext, useEffect, useState } from "react"
import Cookies from 'js-cookie'
import jwt from "jsonwebtoken"

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [user,setUser] = useState(null)

    useEffect(()=>{

        const token = Cookies.get('jwt')
        if (token !== undefined) {
            jwt.verify(token,process.env.NEXT_PUBLIC_JWT,(err,dT)=>{
                try {
                    if (err) throw err;
                    setUser(dT)
                } catch (error) {
                    console.log(error.message);
                }
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