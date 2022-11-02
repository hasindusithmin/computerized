import {createHash,createHmac} from "crypto"
import jwt from "jsonwebtoken";
import { setCookie} from 'cookies-next';


function checkSignature (token, { hash, ...data }) {
    const secret = createHash('sha256')
      .update(token)
      .digest()
    const checkString = Object.keys(data)
      .sort()
      .map(k => `${k}=${data[k]}`)
      .join('\n')
    const hmac = createHmac('sha256', secret)
      .update(checkString)
      .digest('hex')
    return hmac === hash
  }

export default function handler(req, res) {
    const payload = req.query;
    try {
        const auth = checkSignature(process.env.NEXT_PUBLIC_TOKEN, payload)
        if (!auth) throw Error("Forbidden")
        const tkn = jwt.sign(payload,process.env.NEXT_PUBLIC_JWT,{expiresIn:'1h'})
        setCookie('jwt',tkn, { req, res, maxAge: 60 * 60})
        res.status(202).json({message:"Accepted"})
    } catch (error) {
        res.status(403).json({message:error.message})
    }
}