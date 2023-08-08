import React, { useEffect, useState } from 'react';
import style from "./login.css"
import SpinnerComponent from '../components/spinner/spinner.jsx';
import Register from './Register.jsx';
import axios from 'axios';
import ReactDOM from 'react-dom';
import ForgetPassword from "./ForgetPassword.jsx";
import Toast from 'react-bootstrap/Toast';
import aisleschool_logo from './aisleschool_logo.png'
import scratch from "./scratch.png";
import Header from "../modal-login/Header.jsx"

const Login = () => {
    const [list, setList] = useState({
        userName: "",
        password: ""
    });
    const [show,setShow] = useState(false);
    const [passwordError, setpasswordError] = useState('');
    const [nameError, setnameError] = useState('');
    const [loader,setLoader] = useState(false);
    const [error,setError] = useState("");
    const [toatmsg,setToast] = useState({
      message:"",
      type:""
    });

    // toast message toggle
    const handleToast = () => {
      setShow(!show)
    }

    // onchange function
    const HandleChange = (e) => {
        const { name, value } = e.target;

        setList({ ...list, [name]: value })
    }

    // submit function
    const handleSubmit = (e) => {
        e.preventDefault();
        handleNameVlidate();
        handlePasswordVlidate();
        setError("");

        if (!list.userName || !list.password || nameError || passwordError) {
            return false;
        } else {
            setLoader(true)
            axios.post(`http://localhost:8000/api/auth/login`, { userName: list.userName, password: list.password }).then((response) => {
                if (response.data.success) {
                    // toast.success(response.data.message);
                    setToast({
                      message: response.data.message,
                      type:"success"
                    })
                    setShow(true)
                    sessionStorage.setItem("token", response.data.token);
                    sessionStorage.setItem("_id", response.data.id);
                    setLoader(false)
                    setTimeout(() => {
                      require('../playground/render-gui.jsx').default(document.getElementById("root"))
                      setList({
                          email: "",
                          password: ""
                      })
                    },800)
                }
            }).catch((error) => {
                setLoader(false);
                setToast({
                  message: error.response.data.message,
                  type:"danger"
                });
                setShow(true)
                setTimeout(() => {
                  setShow(false);
                },3000);
                // setError(error.response.data.message)
                console.log(error)
            })
        }
    }

    // password validation
    const handlePasswordVlidate = () => {
        setError("");
        if (!list.password) {
            setpasswordError('Please enter password.')
        } else if (list.password.trim().length < 6) {
            setpasswordError('Please enter a valid password.')
        } else {
            setpasswordError('')
        }
    }

    // username validate
    const handleNameVlidate = () => {
         setError("");
        if (!list.userName) {
            setnameError("Please enter user name.")
        } else if (!list.userName.trim() || !list.userName.match(/^[A-Za-z0-9]+$/)) {
            setnameError("Please enter a valid user name.");
        } else {
            setnameError("")
        }
    }

    return (
        <>
        <Header/>
        <div className={style.sectionLogin}>
            <div className={style.wrapper}>
                <div className={`d-flex ${style.loginLogo}`}>
                    <img src={aisleschool_logo} alt="" className="img-fiuld" />
                    <img src={scratch} alt="" className="img-fiuld" />
                </div>
                 <div className={`text-center ${style.name}`}>
                    Login
                </div>
                <form className="p-3 mt-2" onSubmit={handleSubmit}>
                    <div className={`${style.formField} d-flex align-items-center ${nameError ? "mb-0" : "mb-3"}`}>
                        <span className={`far fa-user ${style.positionIcon}`}></span>
                        <input type="text" name="userName" id="userName" placeholder="Username" value={list.userName} onChange={HandleChange} onKeyUp={handleNameVlidate} />
                    </div>
                    {nameError && <p className={`${style.error} mb-3`}>{nameError}</p>}
                    <div className={`${style.formField} d-flex align-items-center ${passwordError ? "mb-0" : "mb-3"}`}>
                        <span className={`fas fa-key ${style.positionIcon}`}></span>
                        <input type="password" name="password" id="pwd" placeholder="Password" value={list.password} onChange={HandleChange} onKeyUp={handlePasswordVlidate} />
                    </div>
                    {(passwordError || error) && <p className={style.error}>{passwordError ? passwordError : error}</p>}
                    <button className={`${loader && style.activeLoading} ${style.btn} mt-3`} type='submit' disabled={loader}>Sign In
                       <span className={`${style.load} ${style.loading}`}></span>
                    </button>
                </form>
                <div className={`text-center fs-6 ${style.link}`}>
                    <span onClick={() =>  ReactDOM.render(<ForgetPassword/>, document.getElementById("root")) } >Forget password?</span> or <span onClick={() =>  ReactDOM.render(<Register/>, document.getElementById("root")) } >Sign up</span>
                </div>
             </div>
          </div>
              <Toast show={show} bg={toatmsg.type} className={`position-fixed top-0 end-0 m-3 d-flex justify-content-between p-1 align-items-center text-light ${style.toastZ}`} >
                <Toast.Body>{toatmsg.message}</Toast.Body>
                <i className="fa-solid fa-xmark pe-2" style={{cursor:"pointer"}} onClick={handleToast}></i>
              </Toast>
        </>
    )
}

export default Login
