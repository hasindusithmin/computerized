import supabase from "../../db";

export default async function handler(req, res) {
    try {
        let {about} = req.query;
        if (about == undefined) throw Error("query:about is required")
        const { count, error } = await supabase
            .from('posts')
            .select('*', { count: 'exact', head: true })
            .eq("about",about)
        if (error) throw error;
        res.status(200).send(count)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}