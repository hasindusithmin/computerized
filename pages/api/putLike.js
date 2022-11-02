import supabase from "../../db"

export default async function handler(req, res) {
    try {
        const { post_id, name } = req.query;
        if (post_id === undefined || name === undefined) throw Error("Query:post_id & name is required")
        const { data, error } = await supabase
            .from('posts')
            .select()
            .eq('post_id', post_id)
        if (error) throw error;
        if (data.length === 0) throw Error("Not Found")
        const likes = data[0]['likes']
        likes.push(name)
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