import icons from "../public/icons.json";
export default function Tags() {

    return (
        <div className="w3-container">
            <p>Tags</p>
            <p>
                {
                    icons
                    &&
                    Object.entries(icons).map(([key,value]) => <img key={key} className="w3-tag w3-white" width={48} height={48} src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${key.toLowerCase()}/${value}.svg`} alt={key} title={key} />)
                }
            </p>
        </div>
    )
}