import Link from "next/link";
import { FaBars, FaHome, FaFan } from "react-icons/fa";
import { CgProfile } from "react-icons/cg"
import { GoSignIn, GoSignOut } from "react-icons/go"; IoIosCreate
import { IoIosCreate } from "react-icons/io"
import AuthContext from "../authcontext";
import { useContext } from "react";
import { useRouter } from "next/router";
export default function Navbar() {

    const context = useContext(AuthContext);
    const router = useRouter()

    function openNav() {
        var x = document.getElementById("navDemo");
        if (x.className.indexOf("w3-show") == -1) {
            x.className += " w3-show";
        } else {
            x.className = x.className.replace(" w3-show", "");
        }
    }

    function modelHandler() {
        const status = document.getElementById('model').style.display;
        if (status === 'none' || status === '') document.getElementById('model').style.display = 'block';
        else if (status === 'block') document.getElementById('model').style.display = 'none';
    }

    function handler(e) {
        const id = e.target.id;
        if (id !== '') {
            if (id === 'home') router.replace('/')
            else if (id === 'logout')  router.replace('/api/logout')
            else {
                router.replace(`/${id}`)
            }
        }
        openNav()
    }

    return (
        <>
            <div className="w3-top">
                <div className="w3-bar w3-theme-d2 w3-left-align w3-large">
                    <span className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2"
                        onClick={openNav} ><FaBars /></span>
                    <span className="w3-bar-item w3-button w3-padding-large w3-theme-d4" onClick={modelHandler}><FaFan className="w3-spin" /></span>
                    <Link href="/"><span className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Home"><FaHome /></span></Link>
                    {
                        !context &&
                        <Link href="/login"><span className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Login"><GoSignIn /></span></Link>
                    }
                    {
                        context &&
                        <>
                            <Link href="/profile"><span className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Profile"><CgProfile /></span></Link>
                            <Link href="/create"><span className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Profile"><IoIosCreate /></span></Link>
                            <Link href="/api/logout"><span className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Logout"><GoSignOut /></span></Link>
                            <span className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-right">{context.first_name} {context.last_name}</span>
                        </>
                    }
                </div>
            </div>
            <div id="navDemo" className="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large">
                {
                    !context &&
                    <>
                        <span className="w3-bar-item w3-button w3-padding-large">Home</span>

                        <span className="w3-bar-item w3-button w3-padding-large" onClick={handler} id="home">
                            <>
                                <FaHome style={{ verticalAlign: 'middle' }} />
                                &nbsp;
                                <span style={{ verticalAlign: 'middle' }}>Home</span>
                            </>
                        </span>
                        <span className="w3-bar-item w3-button w3-padding-large" onClick={handler} id="login">
                            <Link href="/login">
                                <>
                                    <GoSignIn style={{ verticalAlign: 'middle' }} />
                                    &nbsp;
                                    <span style={{ verticalAlign: 'middle' }}>Login</span>
                                </>
                            </Link>
                        </span>
                    </>

                }
                {
                    context &&
                    <>
                        <span className="w3-bar-item w3-button w3-padding-large">Home</span>

                        <span className="w3-bar-item w3-button w3-padding-large">
                            <span style={{ verticalAlign: 'middle' }}>{context.first_name} {context.last_name}</span>
                        </span>
                        <span className="w3-bar-item w3-button w3-padding-large" id="home" onClick={handler}>
                            <>
                                <FaHome style={{ verticalAlign: 'middle' }} />
                                &nbsp;
                                <span style={{ verticalAlign: 'middle' }}>Home</span>
                            </>
                        </span>
                        <span className="w3-bar-item w3-button w3-padding-large" id="profile" onClick={handler}>
                            <>
                                <CgProfile style={{ verticalAlign: 'middle' }} />
                                &nbsp;
                                <span style={{ verticalAlign: 'middle' }}>Profile</span>
                            </>
                        </span>
                        <span className="w3-bar-item w3-button w3-padding-large" id="create" onClick={handler}>
                            <>
                                <IoIosCreate style={{ verticalAlign: 'middle' }} />
                                &nbsp;
                                <span style={{ verticalAlign: 'middle' }}>Create</span>
                            </>
                        </span>
                        <span className="w3-bar-item w3-button w3-padding-large" id="logout" onClick={handler}>
                            <>
                                <GoSignOut style={{ verticalAlign: 'middle' }} />
                                &nbsp;
                                <span style={{ verticalAlign: 'middle' }}>Logout</span>
                            </>
                        </span>
                    </>
                }
            </div>
            <div className="w3-modal" id="model">
                <div className="w3-modal-content w3-card-4 w3-animate-zoom" style={{ maxWidth: '200px', maxHeight: '200px' }}>
                    <div className="w3-padding-64 w3-center w3-theme-d4">
                        <span onClick={modelHandler} className="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
                        <FaFan className="w3-spin" size={64} />
                    </div>
                </div>
            </div>
        </>
    )
}