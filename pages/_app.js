import '../styles/w3.css'
import '../styles/w3-theme-blue-grey.css'
import '../styles/opensans.css'
import '../styles/globals.css'
import '../styles/autocomplete.min.css'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
  return (
    <div className='w3-theme-l5'>
      <Navbar />
      <div className='w3-container w3-content' style={{maxWidth:'1400px',marginTop:'80px'}}>
        <Component {...pageProps} />
      </div>
      <footer className="w3-container w3-theme-d3 w3-bottom">
        <h5>Footer</h5>
      </footer>
    </div>
  )
}

export default MyApp
