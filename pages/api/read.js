
import supabase from "../../db";

export default async function handler(req, res) {
    try {
        const { data, error } = await supabase
            .from('posts')
            .select(`*,comments(*)`)
            .range(0,4)
        if (error) throw error;
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}