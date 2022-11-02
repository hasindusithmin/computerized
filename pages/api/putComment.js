import supabase from "../../db";

export default async function handler(req, res) {
    try {
        const data = req.body;
        const { error } = await supabase
            .from('comments')
            .insert(data)
        if (error) throw error
        res.status(200).json({})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}