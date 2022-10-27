import Link from "next/link";
import { FaBars, FaBell, FaEnvelope, FaGlobe, FaHome, FaUser,FaFan } from "react-icons/fa";
export default function Navbar() {

    function openNav() {
        var x = document.getElementById("navDemo");
        if (x.className.indexOf("w3-show") == -1) {
            x.className += " w3-show";
        } else {
            x.className = x.className.replace(" w3-show", "");
        }
    }

    return (
        <>
            <div className="w3-top">
                <div className="w3-bar w3-theme-d2 w3-left-align w3-large">
                    <span className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2"
                        onClick={openNav} ><FaBars/></span>
                    <span className="w3-bar-item w3-button w3-padding-large w3-theme-d4"><FaFan className="w3-spin"/></span>
                    <Link href="/"><span className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Home"><FaHome/></span></Link> 
                    <span className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="News"> <FaGlobe/> </span>
                    <span className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
                        title="Account Settings"> <FaUser /> </span>
                    <span className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Messages"> <FaEnvelope/> </span>
                    <span className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white"
                        title="My Account">
                        <img src="https://via.placeholder.com/200" className="w3-circle" style={{height:'23px',width:'23px'}} alt="Avatar" />
                    </span>
                </div>
            </div>
            <div id="navDemo" className="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large">
                <span className="w3-bar-item w3-button w3-padding-large">Link 1</span>
                <span className="w3-bar-item w3-button w3-padding-large">Link 2</span>
                <span className="w3-bar-item w3-button w3-padding-large">Link 3</span>
                <span className="w3-bar-item w3-button w3-padding-large">My Profile</span>
            </div>
        </>
    )
}