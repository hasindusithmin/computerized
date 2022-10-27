import icons from "../public/icons.json";
import Link from "next/link";
export default function Tags() {


    return (
        <div className="w3-container">
            <p>Tags</p>
            <p>
                {
                    icons
                    &&
                    Object.entries(icons).map(([key,value]) => 
                        <Link key={key} href={`/dev/${key}`}>
                            <img className="w3-tag w3-white" width={48} height={48} src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${key.toLowerCase()}/${value}.svg`} alt={key} title={key} />
                        </Link>
                    )
                }
            </p>
        </div>
    )
}