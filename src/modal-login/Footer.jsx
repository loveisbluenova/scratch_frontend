import React from 'react';
import style from "./Style.css";

const Footer = () => {
  return (
    <>
     <footer className={style.footerBox}>
      <div className="container">
          <div className="row">
               <div className="col-md-4">
                    <h6>About the Scratch library</h6>
                    <h6>For parents</h6>
                    <h6>For educators</h6>
               </div>
               <div className="col-md-4">
                   <h6>donor</h6>
                   <h6>donation</h6>
                   <h6>job offer</h6>
               </div>
               <div className="col-md-4">
                   <h6>terms of service</h6>
                   <h6>privacy policy</h6>
                   <h6>inquiry</h6>
              </div>
          </div>
          <hr/>
      </div>
      <div className="text-center">
          <p>&copy; Copyright 2023. Aisleschool Corp. All Rights Reserved.</p>
      </div>
      </footer>
    </>
  )
}

export default Footer
