import supabase from "../../db"
import { setCookie } from 'cookies-next';
import jwt from "jsonwebtoken";

export default async function login(req,res){
    try {
        const {firstname,lastname,password,role} = req.body;
        const { data, error } = await supabase.auth.signUp({email:req.body['email'],password,options:{
            data:{firstname,lastname,role}
        }})
        if (error) throw error;
        const {user} = data;
        const {id,email,user_metadata} = user;
        const token = jwt.sign({id,email,user_metadata},process.env.NEXT_PUBLIC_JWT,{expiresIn:'1h'})
        setCookie('jwt',token,{req,res,maxAge:60*60})
        res.status(200).json({message:'user created'})
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}