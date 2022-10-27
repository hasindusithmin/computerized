import icons from "../public/icons.json";
import { FaComment, FaThumbsUp,FaPlus } from "react-icons/fa";


export default function Post({ obj }) {

    const { post_id, time, about, username, image, post, likes,comments } = obj;

    const commentHandler = e => {
        const id = e.target.parentNode.id;
        const current = document.querySelector(`#${id} #comments`).className;
        const class_name = current === 'w3-hide' ? 'w3-show' : 'w3-hide';
        document.querySelector(`#${id} #comments`).className = class_name;
    }

    return (
        <div className="w3-container w3-card w3-white w3-round w3-margin" id={post_id} >
            <br />
            <img src="https://via.placeholder.com/200" alt="PROFILE" className="w3-left w3-circle w3-margin-right" style={{ width: '60px' }} />
            <h4>{username}</h4>
            <br />
            <span className="w3-right w3-opacity"><img className="w3-tag w3-white" width={16} height={16} src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${about.toLowerCase()}/${icons[about]}.svg`} alt={about} title={about} />&nbsp;${time}</span>
            <hr className="w3-clear" />
            <img src={image} style={{ width: '100%' }} className="w3-margin-bottom" />
            <p>{post}</p>
            <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom">
                <FaThumbsUp /> Like <span className="w3-tag">{likes}</span>
            </button>
            &nbsp;
            <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom" onClick={commentHandler}>
                <FaComment /> Comment </button>
            <div className="w3-hide" id="comments">
                <div className="w3-row">
                    <div className="w3-threequarter">
                        <input className="w3-input w3-border" placeholder="Add comment ..."/>
                    </div>
                    <div className="w3-quarter">
                        <button className="w3-button w3-block w3-gray"><FaPlus/></button>
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