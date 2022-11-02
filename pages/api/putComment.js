import supabase from "../../db";

export default async function handler(req, res) {
    try {
        const {comment,user_id,post_id,username,time} = req.body;
        const { error } = await supabase
            .from('comments')
            .insert({comment,user_id,post_id,username,time})
        if (error) throw error
        res.status(200).json({})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}