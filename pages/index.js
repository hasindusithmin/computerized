import { useContext, useEffect, useState } from 'react';
import Tags from '../components/Tags';
import Post from '../components/Post';
import Search from '../components/Search';
import Head from 'next/head';
import AuthContext from '../authcontext';

export default function Home() {

  const auth = useContext(AuthContext)

  const [posts, setPosts] = useState(null);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    fetch(`/api/read?limit=${limit}`)
      .then(res => {
        if (res.status === 200) return res.json()
      })
      .then(data => { setPosts(data) })
  }, [limit])

  const seeMore = () => {
    let _ = limit;
    setLimit(_ += 5);
  }
  const seeLess = () => {
    let _ = limit;
    setLimit(_ -= 5);
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <title>computerize | home</title>
      </Head>
      <div className="w3-row">

        <div className="w3-col l8 s12">
          {
            posts
            &&
            posts.map(obj => <Post key={obj['post_id']} obj={obj} />)
          }

          {
            posts
            &&
            <div className='w3-row w3-container'>
              <div className='w3-half'>
                <button className='w3-button w3-gray' onClick={seeMore}>see more...</button>
              </div>
              <div className='w3-half'>
                {limit > 5 && <button className='w3-button w3-gray w3-right' onClick={seeLess}>see less...</button>}
              </div>
            </div>
          }

          <div className='w3-padding-32'></div>

        </div>

        <div className="w3-col l4">
          {
            auth &&
            <div className="w3-card w3-round w3-white w3-margin-top">
              <div className="w3-container">
                <h4 className="w3-center">My Profile</h4>
                <p className="w3-center">
                  <img src="https://via.placeholder.com/200" className="w3-circle" style={{ height: '106px', width: '106px' }} alt="Avatar" />
                </p>
                <hr />
                <p><i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i> Designer, UI</p>
                <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i> London, UK</p>
                <p><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i> April 1, 1988</p>
              </div>
            </div>
          }

          <br />

          <div className="w3-card w3-round w3-white">
            <Search />
          </div>

          <br />

          <div className="w3-card w3-round w3-white">
            <Tags />
          </div>

        </div>


      </div>
    </>
  )
}