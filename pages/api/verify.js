import { hasCookie,getCookie } from 'cookies-next';
import jwt from "jsonwebtoken"

export default function verify(req,res) {

    try {
        if (!hasCookie('jwt',{req,res})) throw Error("cookie not found")
        const tkn = getCookie('jwt',{req,res})
        jwt.verify(tkn,process.env.NEXT_PUBLIC_JWT,(err,dT)=>{
            if (err) throw err
            res.status(200).json(dT)
        })
    } catch (error) {
        res.status(403).json({error:error.message})
    }

}