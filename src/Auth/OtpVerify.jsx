import React, { useEffect, useState } from 'react';
import style from "./login.css"
import SpinnerComponent from '../components/spinner/spinner.jsx';
import Login from './Login.jsx';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Toast from 'react-bootstrap/Toast';
import ResetPassword from "./ResetPassword.jsx"
// import WrappedGui from '../containers/gui'

const OtpVerify = () => {
  // eslint-disable-next-line
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const [otp, setotp] = useState("");
    const [otpError, setotpError] = useState('');
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
        setotp(e.target.value);
    }

    // submit function
    const handleSubmit = (e) => {
        e.preventDefault();
        handleotpValidate();

        if (!otp || otpError) {
            return false;
        } else {
            setLoader(true)
            axios.post(`http://localhost:8000/api/auth/verify`, { otp,email:sessionStorage.getItem("email") }).then((response) => {
                if (response.data.success) {
                    setToast({
                      message: response.data.message,
                      type:"success"
                    })
                    setShow(true)
                    // require('../playground/render-gui.jsx').default(document.getElementById("root"))
                    setLoader(false);
                    setTimeout(() => {
                      ReactDOM.render(<ResetPassword/>, document.getElementById("root"));
                      setotp("");
                    },800)
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

    // otp validation
    const handleotpValidate = () => {
      if (!otp) {
        setotpError('Please enter a OTP.')
      }else if (!otp.match(/^[0-9]+$/)) {
        setotpError("Please enter only number")
      }else if (otp.length !== 4) {
        setotpError('OTP must be at least 4 characters.')
      } else {
        setotpError('')
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
                      Verify OTP
                </div>
                <form className="p-3 mt-2" onSubmit={handleSubmit}>
                    <div className={`${style.formField} d-flex align-items-center ${otpError ? "mb-0" : "mb-3"} `}>
                      <span className={`fa fa-key ${style.positionIcon}`}></span>
                      <input type="text" maxLength={4} name="otp" id="otp" placeholder="OTP" onChange={HandleChange} value={otp} onKeyUp={handleotpValidate} />
                    </div>
                    {otpError && <p className={`${style.error} mb-3`}>{otpError}</p>}
                    <button className={`${loader && style.activeLoading} ${style.btn} mt-2`} type='submit' disabled={loader}>Verify
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

export default OtpVerify
