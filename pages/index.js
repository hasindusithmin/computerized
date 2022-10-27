import icons from '../public/icons.json';
import autoComplete from "@tarekraafat/autocomplete.js";
import { useEffect, useState } from 'react';
import Tags from '../components/Tags';
import Post from '../components/Post';

export default function Home() {

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const autoCompleteJS = new autoComplete({
      selector: "#autoComplete",
      placeHolder: "Search for Dev...",
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
        }
      }
    });

    fetch('/api/read')
      .then(res => res.json())
      .then(data => { setPosts(data) })

  }, [])

  return (
    <>
      <div className="w3-row">

        <div className="w3-col l8 s12" id="MiddleColumn">
          {
            posts
            &&
            posts.map(obj => <Post key={obj['post_id']} obj={obj} />)
          }
          <div className='w3-padding-32'></div>
        </div>

        <div className="w3-col l4">

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

          <br />

          <div className="w3-card w3-round w3-white">
            <div className="w3-container">
              <p>Search</p>
              <input id="autoComplete" type="search" dir="ltr" spellCheck={false} autoCorrect="off" autoComplete="off" autoCapitalize="off" />
              <p></p>
            </div>
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