import React, { useEffect, useState } from 'react';
import style from "./login.css"
import Login from './Login.jsx';
import axios from 'axios';
import ReactDOM from 'react-dom';
import ForgetPassword from "./ForgetPassword.jsx";
import Toast from 'react-bootstrap/Toast';

// import WrappedGui from '../containers/gui'

const ResetPassword = () => {
    const [list, setList] = useState({
        confirmPassword: "",
        password: ""
    });
    const [show,setShow] = useState(false);
    const [passwordError, setpasswordError] = useState('');
    const [copasswordError, setcopasswordError] = useState('');
    const [loader,setLoader] = useState(false);
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
        handleconfirmPasswordVlidate();
        handlePasswordValidate();

        if (!list.confirmPassword || !list.password || copasswordError || passwordError) {
            return false;
        } else {
            setLoader(true)
            axios.put(`http://localhost:8000/api/auth/resetpassword`, { email: sessionStorage.getItem("email"), password: list.password }).then((response) => {
                if (response.data.success) {
                    // toast.success(response.data.message);
                    setToast({
                      message: response.data.message,
                      type:"success"
                    })
                    setShow(true);
                    sessionStorage.removeItem("email");
                    setLoader(false)
                    setTimeout(() => {
                      ReactDOM.render(<Login/>, document.getElementById("root"));
                      setList({
                          confirmPassword: "",
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
    const handlePasswordValidate = () => {
        if (!list.password) {
            setpasswordError('Please enter password.')
        } else if (!list.password.trim()) {
            setpasswordError('Please enter a valid password.')
        } else if(list.password.length < 6) {
            setpasswordError('Password must be at least 6 characters.')
        }else {
          setpasswordError("");
        }
    }

    // confirm password Validation
    const handleconfirmPasswordVlidate =()=>{
      if (!list.confirmPassword) {
          setcopasswordError('Please enter confirm password.')
      } else if (list.password !== list.confirmPassword) {
          setcopasswordError('Password do not match.')
      } else {
        setcopasswordError("");
      }
    }

    return (
        <>
        <div className={style.sectionLogin}>
            <div className={style.wrapper}>
                <div>
                    <img src="https://scratch.mit.edu/static/assets/90fb0caa5319c39b24946476dd32bb0d.svg" alt="" />
                </div>
                 <div className={`text-center ${style.name}`}>
                    Reset Password
                </div>
                <form className="p-3 mt-2" onSubmit={handleSubmit}>
                    <div className={`${style.formField} d-flex align-items-center ${passwordError ? "mb-0" : "mb-3"}`}>
                        <span className={`fas fa-key ${style.positionIcon}`}></span>
                        <input type="password" name="password" id="pwd" placeholder="Password" value={list.password} onChange={HandleChange} onKeyUp={handlePasswordValidate} />
                    </div>
                    {(passwordError) && <p className={style.error}>{passwordError}</p>}
                    <div className={`${style.formField} d-flex align-items-center ${copasswordError ? "mb-0" : "mb-3"}`}>
                        <span className={`fas fa-key ${style.positionIcon}`}></span>
                        <input type="password" name="confirmPassword" id="pwd" placeholder="confirmPassword" value={list.confirmPassword} onChange={HandleChange} onKeyUp={handleconfirmPasswordVlidate} />
                    </div>
                    {(copasswordError ) && <p className={style.error}>{copasswordError}</p>}
                    <button className={`${loader && style.activeLoading} ${style.btn} mt-3`} type='submit' disabled={loader}>Reset Password
                       <span className={`${style.load} ${style.loading}`}></span>
                    </button>
                </form>
                <div className={`text-center fs-6 ${style.link}`}>
                    <span onClick={() =>  ReactDOM.render(<Login/>, document.getElementById("root")) } >Back to login </span>
                </div>
             </div>
          </div>
              <Toast show={show} bg={toatmsg.type} className="position-fixed top-0 end-0 m-3 d-flex justify-content-between p-1 align-items-center text-light" >
                <Toast.Body>{toatmsg.message}</Toast.Body>
                <i className="fa-solid fa-xmark pe-2" style={{cursor:"pointer"}} onClick={handleToast}></i>
              </Toast>
        </>
    )
}

export default ResetPassword
