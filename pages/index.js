

export default function Home() {

  return (
    <>
      <div className="w3-row">
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
              <p>Interests</p>
              <input className="w3-input w3-border" style={{ width: '50%', margin: 'auto' }} placeholder="Search" />
              <p id="interests"></p>
            </div>
          </div>
          <br />

        </div>

        <div className="w3-col l8 s12" id="MiddleColumn"></div>

      </div>
    </>
  )
}