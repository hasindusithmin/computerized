import Head from "next/head";
import Script from "next/script";

export default function Login() {

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                <title>computerize | login</title>
            </Head>
            <div className="w3-content" style={{maxWidth:'500px'}}>
                <div id="wrapper">
                    <Script
                        id="widget"
                        src="https://telegram.org/js/telegram-widget.js?21"
                        data-telegram-login="computerized_bot"
                        data-size="large"
                        data-auth-url="https://computerize.vercel.app/api/login"
                        data-request-access="write"
                        onLoad={() => {
                            document.getElementById('wrapper').appendChild(document.getElementById('widget'));
                        }}
                    >
                    </Script>
                </div>
            </div>
        </>
    )

}

