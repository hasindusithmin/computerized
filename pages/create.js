import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import autoComplete from "@tarekraafat/autocomplete.js";
import icons from '../public/icons.json';
import supabase from "../db"
import uuidBase62 from "uuid-base62"
export default function Create() {

    const router = useRouter()

    const [user_id, set_user_id] = useState(null)
    const [username, set_username] = useState(null)

    const [about, setAbout] = useState('')
    const [url, setUrl] = useState('https://via.placeholder.com/600x400?text=Preview')
    const [post, setPost] = useState('')
    const [image, setImage] = useState(null)

    useEffect(() => {
        const autoCompleteJS = new autoComplete({
            selector: "#about",
            placeHolder: "What about...",
            data: {
                src: Object.keys(icons),
                cache: true,
            },
            resultsList: {
                element: (list, data) => {
                    if (!data.results.length) {
                        // Create "No Results" message element
                        const message = document.createElement("div");
                        // Add class to the created element
                        message.setAttribute("class", "no_result");
                        // Add message text content
                        message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
                        // Append message element to the results list
                        list.prepend(message);
                    }
                },
                noResults: true,
            },
            resultItem: {
                highlight: true
            },
            events: {
                input: {
                    selection: (event) => {
                        const selection = event.detail.selection.value;
                        autoCompleteJS.input.value = selection;
                    }
                },

            }
        });
        fetch('/api/verify')
            .then(async (res) => {
                if (res.ok) {
                    const { id, first_name, last_name } = await res.json()
                    set_user_id(id)
                    set_username(`${first_name} ${last_name}`)
                }
                else {
                    router.replace('/')
                }
            })
    }, [])

    function handler(e) {
        try {
            const file = e.target.files[0]
            setImage(file)
            const url = URL.createObjectURL(file)
            setUrl(url)
        } catch (error) {
            alert(error.message)
            router.reload()
        }
    }

    async function addPost(e) {
        e.preventDefault()
        try {
            const path = `public/${Date.now()}.png`
            const { data, error } = await supabase
                .storage
                .from('questions')
                .upload(path, image, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: image.type
                })
            if (error) throw error
            const reqBody = {
                post_id:uuidBase62.v4(),
                user_id,
                username,
                about,
                time:new Date().toUTCString(),
                post,
                image:`https://itbnozqiheazburehgvv.supabase.co/storage/v1/object/public/questions/${path}`
            }
            const res = await fetch('/api/post',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(reqBody)
            })
            const _ = await res.json()
            if (!res.ok) throw Error(_['error'])
            router.replace('/')
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                <title>computerize | create</title>
            </Head>
            <div className="w3-row w3-center">
                <div>
                    <img src={url} alt="Preview" width={600} height={400} className="w3-image"/>
                </div>
                <form style={{ margin: 'auto'}} method='POST' onSubmit={addPost}>
                    <div className="w3-section">
                        <label><b>About</b></label>
                        <input className="w3-input w3-border" id="about" type="search" dir="ltr" spellCheck={false} autoCorrect="off" autoComplete="off" autoCapitalize="off" value={about} onChange={e => setAbout(e.target.value)} onBlur={e => setAbout(e.target.value)} />
                    </div>
                    <div className="w3-section">
                        <label><b>Image</b></label>
                        <input className="w3-input w3-border" type="file" required="" onInput={handler} />
                    </div>
                    <div className="w3-section">
                        <label><b>Post</b></label>
                        <textarea className="w3-input w3-border" type="text" required={true} value={post} onInput={e => { setPost(e.target.value) }} />
                    </div>
                    <button type="submit" className="w3-button w3-block w3-dark-grey">Send</button>
                </form>
            </div>
        </>
    )
}