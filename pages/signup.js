import Head from "next/head";
import { useRouter } from "next/router";
import validator from 'validator';
 
export default function Signup() {
    const router = useRouter()
    const register = async(e) => {
        e.preventDefault();
        document.getElementById('notification').innerText = '';
        try {
            const firstname = e.target.firstname.value;
            if (!validator.isAlpha(firstname)) throw Error("Please enter valid firstname");
            const lastname = e.target.lastname.value;
            if (!validator.isAlpha(lastname)) throw Error("Please enter valid lastname");
            const email = e.target.email.value;
            if (!validator.isEmail(email)) throw Error("Please enter valid email");
            const password = e.target.password.value;
            if (!validator.isStrongPassword(password)) throw Error("Please enter strong password.minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1");
            const role = e.target.role.value;
            if (!validator.isAscii(role)) throw Error("Please enter valid role");
            const res = await fetch('/api/signup',{
                method:'POST',
                mode:'same-origin',
                credentials:'same-origin',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({firstname,lastname,email,password,role})
            })
            if (res.status === 200) window.location.href('/')
            else {
                const {error} = await res.json()
                throw Error(error)
            }
        } catch (error) {
            document.getElementById('notification').innerText = error.message;
        }
    }


    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                <title>computerize | signup</title>
            </Head>
            <div className="w3-row">
                <div className="w3-container w3-padding-64">
                    <h1>Signup</h1><br/>
                        <p className="w3-panel w3-leftbar w3-text-red" id="notification"></p>
                        <form method="post" onSubmit={register}>
                            <p><input className="w3-input w3-padding-16" type="text" placeholder="Firstname" required name="firstname" /></p>
                            <p><input className="w3-input w3-padding-16" type="text" placeholder="Lastname" required name="lastname" /></p>
                            <p><input className="w3-input w3-padding-16" type="email" placeholder="Email" required name="email" /></p>
                            <p><input className="w3-input w3-padding-16" type="password" placeholder="Password" required name="password" /></p>
                            <p><input className="w3-input w3-padding-16" type="text" placeholder="Role" required name="role" /></p>
                            <p><button className="w3-button w3-light-grey w3-section" type="submit">REGISTER</button></p>
                        </form>
                </div>
            </div>
        </>
    )

}