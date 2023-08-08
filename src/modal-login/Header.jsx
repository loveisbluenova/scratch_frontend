import React from 'react';
import style from "./Style.css";
import aisleschool_logo from '../Auth/aisleschool_logo.jpg'
import scratch from "../Auth/scratch.png"
import Register from "../Auth/Register.jsx";
import Login from "../Auth/Login.jsx";
import MenuBar from "./MenuBar.jsx";
import ReactDOM from "react-dom"
import logo from "./logo_sm.png";
import {FormattedMessage} from 'react-intl';


const Header = () => {

  // **********************  Change page render function **************************
  const HandlePage = (name)  => {
    if(name === "join"){
      ReactDOM.render(<Register/>, document.getElementById("root"));
    }else {
      ReactDOM.render(<Login/>, document.getElementById("root"));
    }
  }

    //  ************************ logo click call function ************************
      const onClickLogo = () => {
        window.location = 'https://scratch.mit.edu';
    };

    return (
        <>
            <nav className={`navbar navbar-expand-lg sticky-top ${style.bg}`}>
                <div className="container">
                    <div >
                        <a onClick={onClickLogo}>
                            <img src={aisleschool_logo} alt='logo1' width={70} height={40} className='me-2' />
                            <img src={logo} alt='logo1' width={100} height={40} />
                        </a>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item" onClick={() =>ReactDOM.render(<MenuBar/>, document.getElementById("root")) }>
                                <a className={`nav-link ${style.home}`} aria-current="page">
                                    <FormattedMessage
                                          defaultMessage="Home"
                                          description="Text to link to my account settings, in the account navigation menu"
                                          id="gui.demo"
                                    />
                                </a>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        </form>
                        <div className={style.joinScratch + " " + "mx-3"}>
                        <li className={style.modalCommonBtn} onClick={() => HandlePage("join")}>
                            <a className="nav-link active" aria-current="page">join Scratch</a>
                        </li>
                        <li className={style.modalCommonBtn} onClick={() => HandlePage("SIGNIN")}>
                            <a className="nav-link active" aria-current="page">SignIn</a>
                        </li>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header
