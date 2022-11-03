import supabase from "../../db";

export default async function upload(req, res) {
    try {
        const { post_id, user_id, username, about, time, post, image } = req.body;
        const { error } = await supabase
            .from('posts')
            .insert({ post_id, user_id, username, about, time, post, image,likes:[] })
        if (error) throw error;
        res.status(200).json({})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}