import icons from "../public/icons.json";
import { FaComment, FaThumbsUp, FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/router";


export default function Post({ obj }) {

    const router = useRouter();
    const [comment, setComment] = useState('')

    const { post_id, time, about, username, image, post, likes, comments } = obj;

    const commentHandler = e => {
        const id = e.target.parentNode.id;
        const current = document.querySelector(`#${id} #comments`).className;
        const class_name = current === 'w3-hide' ? 'w3-show' : 'w3-hide';
        document.querySelector(`#${id} #comments`).className = class_name;
    }

    const modelHandler = (id) => {
        const model = document.getElementById(`model-${id}`);
        if (model !== null) {
            document.getElementById(`model-${id}`).style.display = 'block'
        }
    }


    const putLike = async (post_id) => {
        const _ = await fetch('/api/verify')
        const d = await _.json()
        if (_.ok) {
            const { first_name, last_name } = d;
            const res = await fetch(`/api/putLike?post_id=${post_id}&user_name=${first_name}%20${last_name}`)
            if (res.ok) router.replace('/')
            else {
                const { error } = await res.json()
                alert(error)
            }
        }
        else {
            router.replace('/login')
        }
    }

    const putComment = async (post_id) => {
        const _ = await fetch('/api/verify')
        const d = await _.json()
        if (_.ok) {
            const { id, first_name, last_name } = d;
            const reqBody = {
                comment,
                user_id: id,
                post_id,
                username: `${first_name} ${last_name}`,
                time: new Date().toUTCString()
            }
            if (comment !== '') {
                const res = await fetch('/api/putComment', {
                    method: 'POST',
                    body: JSON.stringify(reqBody)
                })
                if (res.ok) router.replace('/')

                else {
                    const { error } = await res.json()
                    alert(error)
                }
            }


        }
        else {
            router.replace('/login')
        }
    }

    return (
        <div className="w3-container w3-card w3-white w3-round w3-margin" id={post_id} >
            <br />
            <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${about.toLowerCase()}/${icons[about]}.svg`} alt={about} title={about} className="w3-left w3-circle w3-margin-right" style={{ width: '60px' }} />
            <h4>{username}</h4>
            <br />
            <span className="w3-right w3-opacity">{time}</span>
            <hr className="w3-clear" />
            <img src={image} style={{ width: '100%' }} className="w3-margin-bottom" />
            <div onClick={() => { modelHandler(post_id) }}>
                {
                    likes.length > 0
                    &&
                    <span><FaThumbsUp /> {likes[0]} </span>
                }
                {
                    likes.length > 1 &&
                    <span>and {likes.length - 1} other likes</span>
                }
            </div>
            {
                likes.length > 1 &&
                <div className="w3-modal" id={`model-${post_id}`}>
                    <div className="w3-modal-content w3-animate-zoom" style={{ maxWidth: '300px' }}>
                        <span onClick={() => { document.getElementById(`model-${post_id}`).style.display = 'none' }} className="w3-button w3-display-topright">&times;</span>
                        <ul className="w3-ul">
                            {
                                likes.map(like => <li key={like}><FaThumbsUp color="blue" /> {like}</li>)
                            }
                        </ul>
                    </div>
                </div>
            }
            <hr className="w3-clear" />
            <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom" onClick={() => { putLike(post_id) }}>
                <FaThumbsUp /> Like
            </button>
            &nbsp;
            <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom" onClick={commentHandler}>
                <FaComment /> Comment </button>
            <p>{post}</p>
            <div className="w3-hide" id="comments">
                <div className="w3-row">
                    <div className="w3-threequarter">
                        <input className="w3-input w3-border" placeholder="Add comment ..." value={comment} onInput={e => setComment(e.target.value)} />
                    </div>
                    <div className="w3-quarter">
                        <button className="w3-button w3-block w3-gray" onClick={() => { putComment(post_id) }}><FaPlus /></button>
                    </div>
                </div>
                {
                    comments.length > 0
                    &&
                    comments.map(({ id, username, time, comment }) =>

                        <div className="w3-row" key={id}>
                            <hr />
                            <div>
                                <h4>{username} <span className="w3-opacity w3-medium w3-right">{time}</span>
                                </h4>
                                <p>{comment}</p>
                            </div>
                        </div>

                    )
                }
            </div>
        </div>
    )
}