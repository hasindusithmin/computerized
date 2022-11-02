import { deleteCookie, hasCookie } from 'cookies-next';

export default function handler(req,res) {
    try {
        if (!hasCookie('jwt',{req,res})) throw Error("cookie not found")
        deleteCookie('jwt',{req,res})
        res.redirect('/')
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}