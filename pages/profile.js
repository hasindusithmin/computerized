import Head from "next/head";
import { useEffect, useState } from "react";


export default function Profile() {

    const [id, set_id] = useState(null)
    const [first_name, set_first_name] = useState(null)
    const [last_name, set_last_name] = useState(null)
    const [auth_date, set_auth_date] = useState(null)

    const [username, set_username] = useState(null)
    const [photo_url, set_photo_url] = useState(null)

    useEffect(() => {
        fetch('/api/verify')
            .then(async (res) => {
                const data = await res.json()
                if (res.ok) {
                    const { id, first_name, last_name, auth_date } = data;
                    set_id(id)
                    set_auth_date(auth_date)
                    set_first_name(first_name)
                    set_last_name(last_name)
                    const keys = Object.keys(data)
                    if (keys.includes('username')) set_username(data['username'])
                    if (keys.includes('photo_url')) set_photo_url(decodeURI(data['photo_url']))
                }
                else throw Error(data['error'])
            })
            .catch(error => {
                console.log(error.message);
            })
    }, [])

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                <title>computerize | profile</title>
            </Head>
            {
                id &&
                <div className="w3-card-4" style={{width:'92%',maxWidth:'300px',margin:'auto'}}>
                    <img src={photo_url ? photo_url:'https://via.placeholder.com/320x320/afeeee'} alt="Avatar" style={{width:'100%',opacity:'0.85'}} />
                        <div class="w3-container">
                            {username && <h4><b>{username}</b></h4>}
                            <p>{first_name} {last_name}</p>
                            <p>{new Date(auth_date * 1000).toUTCString()}</p>
                        </div>
                </div>
            }
        </>
    )
}