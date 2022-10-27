import Search from "../../components/Search";
import Tags from "../../components/Tags";
import Post from "../../components/Post";
import { useRouter } from "next/router"
import { useState,useEffect } from "react";

export default function Dev() {

    const router = useRouter();

    const [posts, setPosts] = useState(null);
    const [limit, setLimit] = useState(5);
    const [Dev,setDev] = useState(false);

    const {dev} = router.query;

    if (dev !== undefined && !Dev) setDev(dev)

    useEffect(() => {
        if (Dev) {
            fetch(`/api/readbytopic?about=${dev}&limit=${limit}`)
            .then(res => {
                if (res.status === 200) return res.json()
            })
            .then(data => { setPosts(data) })
        }
    }, [Dev,limit])

    const seeMore = () => {
        let _ = limit;
        setLimit(_ += 5);
    }
    const seeLess = () => {
        let _ = limit;
        setLimit(_ -= 5);
    }

    return (
        <div className="w3-row">
            <div className="w3-col l8 s12">
                {
                    posts
                    &&
                    posts.map(obj => <Post key={obj['post_id']} obj={obj} />)
                }

                {
                    posts
                    &&
                    <div className='w3-row w3-container'>
                        <div className='w3-half'>
                            <button className='w3-button w3-gray' onClick={seeMore}>see more...</button>
                        </div>
                        <div className='w3-half'>
                            {limit > 5 && <button className='w3-button w3-gray w3-right' onClick={seeLess}>see less...</button>}
                        </div>
                    </div>
                }

                <div className='w3-padding-32'></div>
            </div>

            <div className="w3-col l4">
                <div className="w3-card w3-round w3-white w3-margin">
                    <Search />
                </div>
                <div className="w3-card w3-round w3-white w3-margin">
                    <Tags />
                </div>
            </div>
        </div>
    )
}