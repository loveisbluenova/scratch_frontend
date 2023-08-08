import React from 'react'
import Header from './Header.jsx'
import style from "./Style.css";
import image1 from "./feature-image/1.png";
import image2 from "./feature-image/2.png";
import image3 from "./feature-image/3.png";
import image4 from "./feature-image/4.png";
import image5 from "./feature-image/5.png";
import part1 from "./part/a.jpg";
import part2 from "./part/b.jpg";
import part3 from "./part/c.jpg";
import part4 from "./part/d.jpg";
import part5 from "./part/e.jpg";
import Footer from "./Footer.jsx";

const MenuBar = () => {
  return (
         <React.Fragment>
            <Header/>\
             <div className="container">
                   <div className="d-flex justify-content-center my-3">
                         <button className={style.tabBtn}>About the Sualch library</button>
                         <button className={style.tabBtn}>About Scratch</button>
                         <button className={style.tabBtn}>For parents</button>
                         <button className={style.tabBtn}>For educators</button>
                         <button className={style.tabBtn}>donation</button>
                    </div>

                    <div className={`row ${style.imageBox} justify-content-center pb-3 `}>
                          <div className="d-flex justify-content-between my-2">
                               <h4 className={style.heading}>attention project</h4>
                               <h4 className={style.heading}>See More</h4>
                          </div>

                          <div className="col-2">
                              <img src={image1} width={160} height={130}/>
                              <h6 className={style.subHeading} >Crazy Pinball frenzy </h6>
                              <p  className={style.subHeadingTitle}>LCGcheng</p>
                          </div>

                          <div className="col-2">
                          <img src={image2}  width={160} height={130}/>
                          <h6  className={style.subHeading}>{'Perfect Pancakes - How To Make Pancakes'.slice(0,16 )}...</h6>
                          <p  className={style.subHeadingTitle}>Monty017</p>
                          </div>

                          <div className="col-2">
                          <img src={image3}  width={160} height={130}/>
                          <h6  className={style.subHeading}>Lost in the Woods</h6>
                          <p  className={style.subHeadingTitle}>Cibby_Pinkcat</p>
                          </div>

                          <div className="col-2">
                          <img src={image4} width={160} height={130} />
                          <h6  className={style.subHeading}>{'Noodle Neck 1.4 (mobile friendly)'.slice(0,15)}...</h6>
                          <p  className={style.subHeadingTitle}>Artsygirlforlife</p>
                          </div>

                          <div className="col-2">
                          <img src={image5}  width={160} height={130}/>
                          <h6 className={style.subHeading}> Sprite Math! </h6>
                          <p  className={style.subHeadingTitle}>JHippo1</p>
                          </div>

                    </div>

                    <div className={`row ${style.imageBox} justify-content-center pb-3 `}>
                          <div className="d-flex justify-content-between my-2">
                               <h4 className={style.heading}>featured parts</h4>
                               <h4 className={style.heading}>See More</h4>
                          </div>

                          <div className='col-2'>
                            <div className={style.imagePartBox}>
                              <img src={part1} width={160} height={130}/>
                              <h6 className={style.subHeadingpart} >Bat</h6>
                            </div>
                          </div>

                          <div className='col-2'>
                            <div className={style.imagePartBox}>
                          <img src={part2}  width={160} height={130}/>
                          <h6  className={style.subHeadingpart}>Bear</h6>
                          </div>
                        </div>

                          <div className='col-2'>
                            <div className={style.imagePartBox}>
                          <img src={part3}  width={160} height={130}/>
                          <h6  className={style.subHeadingpart}>Bear-wallking</h6>
                          </div>
                        </div>

                          <div className='col-2'>
                            <div className={style.imagePartBox}>
                          <img src={part4} width={160} height={130} />
                          <h6  className={style.subHeadingpart}>Beetle</h6>
                          </div>
                        </div>

                          <div className='col-2'>
                            <div className={style.imagePartBox}>
                          <img src={part5}  width={160} height={130}/>
                          <h6 className={style.subHeadingpart}>Butterfly 1</h6>
                          </div>
                        </div>
                    </div>
             </div>
             <Footer/>
         </React.Fragment>
  )
}

export default MenuBar
