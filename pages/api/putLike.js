import supabase from "../../db"

export default async function handler(req, res) {
    try {
        const { post_id, user_name } = req.query;
        if (post_id === undefined || user_name === undefined) throw Error("Query:post_id & user_name is required")
        const { data, error } = await supabase
            .from('posts')
            .select()
            .eq('post_id', post_id)
        if (error) throw error;
        if (data.length === 0) throw Error("Not Found")
        const likes = data[0]['likes']
        if (likes.includes(user_name)) throw Error("Already Liked!")
        likes.push(user_name)
        const result = await supabase
            .from('posts')
            .update({ likes: likes })
            .eq('post_id', post_id)
        if (result.error) throw Error(result.error)
        res.status(200).json({})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}