import icons from "../public/icons.json";
import { useRouter } from "next/router";
export default function Tags() {

    const router = useRouter();

    const handler = e => {
        router.push(`/dev/${e.target.title}`)
        const k = router.asPath.search(/dev/i)
        if (k === 1) setTimeout(()=>{router.reload()},250)
    }

    return (
        <div className="w3-container w3-center">
            <p>Tags</p>
            <p>
                {
                    icons
                    &&
                    Object.entries(icons).map(([key,value]) => 
                        <img key={key} className="w3-tag w3-white" width={48} height={48} src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${key.toLowerCase()}/${value}.svg`} alt={key} title={key} onClick={handler}/>
                    )
                }
            </p>
        </div>
    )
}