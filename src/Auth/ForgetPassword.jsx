import React, { useEffect, useState } from 'react';
import style from "./login.css"
import Login from './Login.jsx';
import OtpVerify from './OtpVerify.jsx'
import axios from 'axios';
import ReactDOM from 'react-dom';
import Toast from 'react-bootstrap/Toast';
// import WrappedGui from '../containers/gui'

const ForgetPassword = () => {
  // eslint-disable-next-line
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const [email, setemail] = useState("");
    const [emailError, setemailError] = useState('');
    const [loader,setLoader] = useState(false);
    const [show,setShow] = useState(false);
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
        setemail(e.target.value);
    }

    // submit function
    const handleSubmit = (e) => {
        e.preventDefault();
        handleemailValidate();

        if (!email || emailError) {
            return false;
        } else {
            setLoader(true)
            axios.post(`http://localhost:8000/api/auth/mailsend`, { email }).then((response) => {
                if (response.data.success) {
                    sessionStorage.setItem("email", response.data.data);
                    setToast({
                      message: response.data.message,
                      type:"success"
                    })
                    setShow(true);
                    setTimeout(() => {
                      ReactDOM.render(<OtpVerify/>, document.getElementById("root"));
                      setemail("");
                    },800)
                    setLoader(false)
                }
            }).catch((error) => {
                setLoader(false)
                setToast({
                  message: error.response.data.message,
                  type:"danger"
                });
                setShow(true)
                setTimeout(() => {
                  setShow(false);
                },3000);
                console.log(error)
            })
        }
    }

    // email validation
    const handleemailValidate = () => {
      if (!email) {
        setemailError('Please enter a email address.')
      } else if (!email.match(mailformat)) {
        setemailError('Please enter a valid email address.')
      } else {
        setemailError('')
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
                    Forget Password
                </div>
                <form className="p-3 mt-2" onSubmit={handleSubmit}>
                    <div className={`${style.formField} d-flex align-items-center ${emailError ? "mb-0" : "mb-3"} `}>
                      <span className={`fa-regular fa-envelope ${style.positionIcon}`}></span>
                      <input type="text" name="email" id="email" placeholder="Email" onChange={HandleChange} value={email} onKeyUp={handleemailValidate} />
                    </div>
                    {emailError && <p className={`${style.error} mb-3`}>{emailError}</p>}
                    <button className={`${loader && style.activeLoading} ${style.btn} mt-2`} type='submit' disabled={loader}>Submit
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

export default ForgetPassword
