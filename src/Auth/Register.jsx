import React,{useState} from 'react';
import style from "./Register.css";
import ReactDOM from 'react-dom';
import Login from "./Login.jsx";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import Header from "../modal-login/Header.jsx"

const Register = () => {
  // eslint-disable-next-line
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const [loader,setLoader] = useState(false);
    const [show,setShow] = useState(false);
    const  Country = [
         "Afghanistan"
         , "Åland Islands"
         , "Albania"
         , "Algeria"
         , "American Samoa"
         , "Andorra"
         , "Angola"
         , "Anguilla"
         , "Antarctica"
         , "Antigua and Barbuda"
         , "Argentina"
         , "Armenia"
         , "Aruba"
         , "Australia"
         , "Austria"
         , "Azerbaijan"
         , "Bahamas"
         , "Bahrain"
         , "Bangladesh"
         , "Barbados"
         , "Belarus"
         , "Belgium"
         , "Belize"
         , "Benin"
         , "Bermuda"
         , "Bhutan"
         , "Bolivia"
         , "Bosnia and Herzegovina"
         , "Botswana"
         , "Bouvet Island"
         , "Brazil"
         , "British Indian Ocean Territory"
         , "Brunei Darussalam"
         , "Bulgaria"
         , "Burkina Faso"
         , "Burundi"
         , "Cambodia"
         , "Cameroon"
         , "Canada"
         , "Cape Verde"
         , "Cayman Islands"
         , "Central African Republic"
         , "Chad"
         , "Chile"
         , "China"
         , "Christmas Island"
         , "Cocos (Keeling) Islands"
         , "Colombia"
         , "Comoros"
         , "Congo"
         , "Congo, The Democratic Republic of The"
         , "Cook Islands"
         , "Costa Rica"
         , "Cote D'ivoire"
         , "Croatia"
         , "Cuba"
         , "Cyprus"
         , "Czech Republic"
         , "Denmark"
         , "Djibouti"
         , "Dominica"
         , "Dominican Republic"
         , "Ecuador"
         , "Egypt"
         , "El Salvador"
         , "Equatorial Guinea"
         , "Eritrea"
         , "Estonia"
         , "Ethiopia"
         , "Falkland Islands (Malvinas)"
         , "Faroe Islands"
         , "Fiji"
         , "Finland"
         , "France"
         , "French Guiana"
         , "French Polynesia"
         , "French Southern Territories"
         , "Gabon"
         , "Gambia"
         , "Georgia"
         , "Germany"
         , "Ghana"
         , "Gibraltar"
         , "Greece"
         , "Greenland"
         , "Grenada"
         , "Guadeloupe"
         , "Guam"
         , "Guatemala"
         , "Guernsey"
         , "Guinea"
         , "Guinea-bissau"
         , "Guyana"
         , "Haiti"
         , "Heard Island and Mcdonald Islands"
         , "Holy See (Vatican City State)"
         , "Honduras"
         , "Hong Kong"
         , "Hungary"
         , "Iceland"
         , "India"
         , "Indonesia"
         , "Iran, Islamic Republic of"
         , "Iraq"
         , "Ireland"
         , "Isle of Man"
         , "Israel"
         , "Italy"
         , "Jamaica"
         , "Japan"
         , "Jersey"
         , "Jordan"
         , "Kazakhstan"
         , "Kenya"
         , "Kiribati"
         , "Korea, Democratic People's Republic of"
         , "Korea, Republic of"
         , "Kuwait"
         , "Kyrgyzstan"
         , "Lao People's Democratic Republic"
         , "Latvia"
         , "Lebanon"
         , "Lesotho"
         , "Liberia"
         , "Libyan Arab Jamahiriya"
         , "Liechtenstein"
         , "Lithuania"
         , "Luxembourg"
         , "Macao"
         , "Macedonia, The Former Yugoslav Republic of"
         , "Madagascar"
         , "Malawi"
         , "Malaysia"
         , "Maldives"
         , "Mali"
         , "Malta"
         , "Marshall Islands"
         , "Martinique"
         , "Mauritania"
         , "Mauritius"
         , "Mayotte"
         , "Mexico"
         , "Micronesia, Federated States of"
         , "Moldova, Republic of"
         , "Monaco"
         , "Mongolia"
         , "Montenegro"
         , "Montserrat"
         , "Morocco"
         , "Mozambique"
         , "Myanmar"
         , "Namibia"
         , "Nauru"
         , "Nepal"
         , "Netherlands"
         , "Netherlands Antilles"
         , "New Caledonia"
         , "New Zealand"
         , "Nicaragua"
         , "Niger"
         , "Nigeria"
         , "Niue"
         , "Norfolk Island"
         , "Northern Mariana Islands"
         , "Norway"
         , "Oman"
         , "Pakistan"
         , "Palau"
         , "Palestinian Territory, Occupied"
         , "Panama"
         , "Papua New Guinea"
         , "Paraguay"
         , "Peru"
         , "Philippines"
         , "Pitcairn"
         , "Poland"
         , "Portugal"
         , "Puerto Rico"
         , "Qatar"
         , "Reunion"
         , "Romania"
         , "Russian Federation"
         , "Rwanda"
         , "Saint Helena"
         , "Saint Kitts and Nevis"
         , "Saint Lucia"
         , "Saint Pierre and Miquelon"
         , "Saint Vincent and The Grenadines"
         , "Samoa"
         , "San Marino"
         , "Sao Tome and Principe"
         , "Saudi Arabia"
         , "Senegal"
         , "Serbia"
         , "Seychelles"
         , "Sierra Leone"
         , "Singapore"
         , "Slovakia"
         , "Slovenia"
         , "Solomon Islands"
         , "Somalia"
         , "South Africa"
         , "South Georgia and The South Sandwich Islands"
         , "Spain"
         , "Sri Lanka"
         , "Sudan"
         , "Suriname"
         , "Svalbard and Jan Mayen"
         , "Swaziland"
         , "Sweden"
         , "Switzerland"
         , "Syrian Arab Republic"
         , "Taiwan"
         , "Tajikistan"
         , "Tanzania, United Republic of"
         , "Thailand"
         , "Timor-leste"
         , "Togo"
         , "Tokelau"
         , "Tonga"
         , "Trinidad and Tobago"
         , "Tunisia"
         , "Turkey"
         , "Turkmenistan"
         , "Turks and Caicos Islands"
         , "Tuvalu"
         , "Uganda"
         , "Ukraine"
         , "United Arab Emirates"
         , "United Kingdom"
         , "United States"
         , "United States Minor Outlying Islands"
         , "Uruguay"
         , "Uzbekistan"
         , "Vanuatu"
         , "Venezuela"
         , "Viet Nam"
         , "Virgin Islands, British"
         , "Virgin Islands, U.S."
         , "Wallis and Futuna"
         , "Western Sahara"
         , "Yemen"
         , "Zambia"
         , "Zimbabwe"
     ];
     const [toatmsg,setToast] = useState({
       message:"",
       type:""
     })

     const [field,setField]=useState({
       userName:"",
       email:"",
       phone:"",
       gender:"",
       password:"",
       confirmPassword:"",
       country:"India",
       dateOfBirth : ""
     });
     const [passwordError, setpasswordError] = useState('');
     const [confirmpasswordError, setconfirmpasswordError] = useState('');
     const [nameError, setnameError] = useState('');
     const [phoneError, setphoneError] = useState('');
     const [emailError,setEmailError] = useState("");
     const [dateError,setdateError] = useState("");
     const [genderError,setgenderError] = useState("");
     const [error,setError] = useState("");

     // toast message toggle
     const handleToast = () => {
       setShow(!show)
     }

     // onchange function
     const HandleChange = (e) => {
       let {name,value} = e.target;

       setField({...field,[name]:value})
     }

     // user name Validation
     const userNameValidation = () => {
       if (!field.userName) {
           setnameError("Please enter user name.")
       } else if (!field.userName.trim()) {
         setnameError("Please enter a valid user name.");
       }else if (!field.userName.match(/^[A-Za-z0-9]+$/)) {
           setnameError("Please enter a valid user name.");
       } else {
           setnameError("")
       }
     }

     // check user name in data base
     const UserNamecheck = () => {
       if(!nameError){
         axios.post(`http://localhost:8000/api/user/checkuserName`, { userName: field.userName}).then((response) => {
             if (response.data.success) {
              setnameError("")
             }
         }).catch((error) => {
             setnameError(error.response.data.message)
             console.log(error)
         })
       }
     }

     //  phone number validation
     const phoneValidation = () => {
      if(!field.phone){
        setphoneError("Please enter mobile number.")
      }else if (!field.phone.match(/^[0-9]+$/)) {
        setphoneError("Please enter only number.")
      }else if (field.phone.length !== 10) {
        setphoneError("Mobile number must be at least 10 characters.")
      }else {
        setphoneError("")
      }
    }

    // email validation
    const handleemailVlidate = () => {
      if (!field.email) {
        setEmailError('Please enter a email address.')
      } else if (!field.email.match(mailformat)) {
        setEmailError('Please enter a valid email address.')
      } else {
        setEmailError('')
      }
    }

    // check email in data base
    const emailcheck = () => {
      if(!emailError){
        axios.post(`http://localhost:8000/api/user/checkemail`, { email: field.email}).then((response) => {
            if (response.data.success) {
             setEmailError("");
            }
        }).catch((error) => {
            setEmailError(error.response.data.message)
            console.log(error)
        })
      }
    }

    // password validation
    const handlePasswordVlidate = () => {
        if (!field.password) {
            setpasswordError('Please enter password.')
        } else if (!field.password.trim()) {
            setpasswordError('Please enter a valid password.')
        } else if(field.password.length < 6) {
            setpasswordError('Password must be at least 6 characters.')
        }else {
          setpasswordError("");
        }
    }

    // confirm password Validation
    const handleconfirmPasswordVlidate =()=>{
      if (!field.confirmPassword) {
          setconfirmpasswordError('Please enter confirm password.')
      } else if (field.password !== field.confirmPassword) {
          setconfirmpasswordError('Password do not match.')
      } else {
        setconfirmpasswordError("");
      }
    }

    // date of birth validate
    const handledatevalidate = () => {
      if(!field.dateOfBirth){
        setdateError("Please select date.")
      }else {
        setdateError("")
      }
    }

    // gender valiadtion
    const handlegenderValidate = () => {
      if(!field.gender || field.gender === "0"){
        setgenderError("Please select gender.")
      }else {
        setgenderError("");
      }
    }

    // submit function
    const handleSubmit = (e) => {
      e.preventDefault();
      if(!nameError){
        userNameValidation();
      }
      phoneValidation();
      if(!emailError){
        handleemailVlidate();
      }
      handlePasswordVlidate();
      handleconfirmPasswordVlidate();
      handledatevalidate();
      handlegenderValidate();

      setError("");

      let { userName,email,phone,gender,password,confirmPassword,country,dateOfBirth} = field;

      if(!userName || !email || !phone || !gender || !password || !confirmPassword || !country || !dateOfBirth){
        return false;
      }

      if(nameError || phoneError || emailError || passwordError || confirmpasswordError || dateError || genderError ){
        return false;
      }else {
        setLoader(true)
        axios.post(`http://localhost:8000/api/user`, field).then((response) => {
            if (response.data.success) {
                setToast({
                  message: response.data.message,
                  type:"success"
                })
                setShow(true)
                setLoader(false);
                setTimeout(() => {
                  setShow(false);
                  ReactDOM.render(<Login/>, document.getElementById("root"));
                  setField({
                    userName:"",
                    email:"",
                    phone:"",
                    gender:"",
                    password:"",
                    confirmPassword:"",
                    country:"India",
                    dateOfBirth : ""
                  })
                },800)
            }
        }).catch((error) => {
            setLoader(false)
            setToast({
              message: error.response.data.message,
              type:"danger"
            })
            setShow(true)
            setTimeout(() => {
              setShow(false);
            },3000)
            // setError(error.response.data.message)
            console.log(error)
        })
      }

    }

  return (
<React.Fragment>
<Header/>
    <div className={style.sectionLogin}>
            <div className={style.wrapper}>
                <div className="text-center">
                    <img src="https://scratch.mit.edu/static/assets/90fb0caa5319c39b24946476dd32bb0d.svg" alt=""  />
                </div>
                 <div className={`text-center ${style.name}`}>
                    Register
                </div>
                <form className=" mt-2" onSubmit={handleSubmit} >
                <div className="row">
                    <div className="col-md-6">
                        <div className={`${style.formField} d-flex align-items-center ${nameError ? "mb-0" : "mb-3"}`}>
                          <span className={`far fa-user ${style.positionIcon}`}></span>
                          <input type="text" name="userName" id="userName" placeholder="User name" value={field.userName} onChange={HandleChange} onKeyUp={userNameValidation} onBlur={UserNamecheck} />
                        </div>
                        {nameError &&  <p className={`${style.error} mb-3`}>{nameError}</p>}
                    </div>
                    <div className="col-md-6">
                        <div className={`${style.formField} d-flex align-items-center ${phoneError ? "mb-0" : "mb-3"}`}>
                          <span className={`fa-solid fa-mobile-screen ${style.positionIcon}`}></span>
                          <input type="text" name="phone" id="phone" placeholder="Mobile number" maxLength={10} value={field.phone} onChange={HandleChange} onKeyUp={phoneValidation} />
                        </div>
                        {phoneError &&  <p className={`${style.error} mb-3`}>{phoneError}</p>}
                    </div>
                 </div>
                 <div className="row">
                       <div className="col-md-6">
                           <div className={`${style.formField} d-flex align-items-center  ${emailError ? "mb-0" : "mb-3"} `}>
                             <span className={`fa-regular fa-envelope ${style.positionIcon}`}></span>
                             <input type="text" name="email" id="email" placeholder="Email" value={field.email} onChange={HandleChange} onBlur={emailcheck} onKeyUp={handleemailVlidate} />
                           </div>
                           {emailError &&  <p className={`${style.error} mb-3`}>{emailError}</p>}
                       </div>
                       <div className="col-md-6">
                           <div className={`${style.formField} d-flex align-items-center ${dateError ? "mb-0" : "mb-3"}`}>
                             <input type="date" name="dateOfBirth" value={field.dateOfBirth} onChange={HandleChange} onBlur={handledatevalidate} />
                           </div>
                           {dateError &&  <p className={`${style.error} mb-3`}>{dateError}</p>}
                       </div>
                  </div>
                  <div className="row">
                      <div className="col-md-6">
                          <div className={`${style.formField} d-flex align-items-center ${passwordError ? "mb-0" : "mb-3"} `}>
                            <span className={`fas fa-key ${style.positionIcon}`}></span>
                            <input type="password" name="password" id="password" placeholder="Password" value={field.password} onChange={HandleChange} onKeyUp={handlePasswordVlidate} />
                          </div>
                          {passwordError &&  <p className={`${style.error} mb-3`}>{passwordError}</p>}
                      </div>
                      <div className="col-md-6">
                        <div className={`${style.formField} d-flex align-items-center ${confirmpasswordError ? "mb-0" : "mb-3"} `}>
                        <span className={`fas fa-key ${style.positionIcon}`}></span>
                          <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm password" value={field.confirmPassword} onChange={HandleChange} onKeyUp={handleconfirmPasswordVlidate}/>
                        </div>
                        {confirmpasswordError &&  <p className={`${style.error} mb-3`}>{confirmpasswordError}</p>}
                      </div>

                   </div>
                   <div className="row">
                       <div className="col-md-6">
                           <div className={`${style.formField} d-flex align-items-center  `}>
                             <span className={`fa-solid fa-earth-americas ${style.positionIcon}`}></span>
                             <select  name="country" id="country" value={field.country} onChange={HandleChange}>
                                 {Country.map((val) => {
                                   return <option value={val} key={val}>{val}</option>
                                 })}
                             </select>
                           </div>
                       </div>
                       <div className="col-md-6">
                            <div className={`${style.formField} d-flex align-items-center ${genderError ? "mb-0" : "mb-3"} `}>
                               <span className={`fa-solid fa-genderless ${style.positionIcon}`}></span>
                               <select  name="gender" id="gender" value={field.gender} onChange={HandleChange} onClick={handlegenderValidate} >
                                    <option value="0">select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                               </select>
                            </div>
                            {genderError &&  <p className={`${style.error} mb-3`}>{genderError}</p>}
                       </div>
                    </div>
                    {error &&  <p className={`${style.error} mb-3`}>{error}</p>}
                    <div className="text-center">
                        <button className={`${loader && style.activeLoading} ${style.btn} mt-1`} type='submit' disabled={loader}>Sign Up
                           <span className={`${style.load} ${style.loading}`}></span>
                        </button>
                    </div>
                    <div className={`text-center fs-6 mt-3 ${style.link}`}>
                    Already have an account? <span onClick={() =>  ReactDOM.render(<Login/>, document.getElementById("root")) } >Sign In</span>
                    </div>
                </form>
            </div>
         </div>
          <Toast show={show} bg={toatmsg.type} className={`position-fixed top-0 end-0 m-3 d-flex justify-content-between p-1 align-items-center text-light ${style .toastZ}`} >
            <Toast.Body>{toatmsg.message}</Toast.Body>
            <i className="fa-solid fa-xmark pe-2" style={{cursor:"pointer"}} onClick={handleToast}></i>
          </Toast>
        </React.Fragment>
  )
}

export default Register
