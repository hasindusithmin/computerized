
import supabase from "../../db";

export default async function handler(req, res) {
    try {
        let {limit} = req.query;
        if (limit == undefined) limit = 5;
        const { data, error } = await supabase
            .from('posts')
            .select(`*,comments(*)`)
            .limit(parseInt(limit))
        if (error) throw error;
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}