import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Visa from "../../../public/images/Visa.png";
import Download from "../../../public/images/download.png";
import Pay from "../../../public/images/Pay.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'; // Import the Facebook icon
import WOW from 'wow.js'

import 'animate.css/animate.min.css';

const Footer = () => {
 
  useEffect(() => {
    const wow = new WOW();
    wow.init();
  }, []);
  return (
    <>
<footer  style={{marginTop:"100px"}}>
    <div className="container-fluid  bord">
    <div className="row custom-justify-content-center mt-5"> {/* Added custom CSS class */}
        <div className="col-md  wow animate__animated animate__fadeInUp">
        <h4 style={{fontWeight:"500",fontSize:"1.125rem",lineHeight:"1.75rem"}} className="mb-4 text-sm font-semibold text-heading md:text-base xl:text-lg 2xl:mb-6 3xl:mb-7">Social</h4>
<p><FontAwesomeIcon icon={faInstagram} />  Instagram</p>
<p><FontAwesomeIcon icon={faTwitter} /> Twitter</p>
<p> <FontAwesomeIcon icon={faFacebook} />  Facebook</p>
<p> <FontAwesomeIcon icon={faYoutube} />  Youtube</p>

        </div>
        <div className="col-md  wow animate__animated animate__fadeInUp">
        <h4 style={{fontWeight:"500",fontSize:"1.125rem",lineHeight:"1.75rem"}}c className="mb-4 text-sm font-semibold text-heading md:text-base xl:text-lg 2xl:mb-6 3xl:mb-7">Contact</h4>
        <p>    Contact Us</p>
        <p>yourexample@email.com</p>
        <p>example@email.com</p>
        <p>  Call us: +1 254 568-5479</p>
    
        </div>
        <div className="col-md  wow animate__animated animate__fadeInUp">
        <h4 style={{fontWeight:"500",fontSize:"1.125rem",lineHeight:"1.75rem"}} className="mb-4 text-sm font-semibold text-heading md:text-base xl:text-lg 2xl:mb-6 3xl:mb-7">About</h4>
      <p>Support Center</p>
      <p>Customer Support</p>
      <p>About Us</p>
      <p>Copyright</p>
      
    
        </div>
        <div className="col-md  wow animate__animated animate__fadeInUp">
        <h4 style={{fontWeight:"500",fontSize:"1.125rem",lineHeight:"1.75rem"}} className="mb-4 text-sm font-semibold text-heading md:text-base xl:text-lg 2xl:mb-6 3xl:mb-7">Customer Care</h4>
     <p>FAQ & Helps</p>
     <p>Shipping & Delivery</p>
     <p>Return & Exchanges</p>
     
     
     
        </div>
        <div className="col-md  wow animate__animated animate__fadeInUp">
        <h4 style={{fontWeight:"500",fontSize:"1.125rem",lineHeight:"1.75rem"}} className="mb-4 text-sm font-semibold text-heading md:text-base xl:text-lg 2xl:mb-6 3xl:mb-7">Our Information</h4>
     <p>Privacy policy update</p>
     <p>Terms & conditions</p>
     <p>Return Policy</p>
     <p>Site Map</p>
     
       
        </div>
        <div className="col-md  wow animate__animated animate__fadeInUp">
        <h4 style={{fontWeight:"500",fontSize:"1.125rem",lineHeight:"1.75rem"}} className="mb-4 text-sm font-semibold text-heading md:text-base xl:text-lg 2xl:mb-6 3xl:mb-7">Top Categories</h4>
      
      <p> Men's Wear</p>
      <p>Men's Wear</p>
      <p>Kid's Wear</p>
      <p> Sports Wear</p>
      
      
        </div>

  </div>
  <div class="row bord mt-5  wow animate__animated animate__fadeInUp">
    <div class="col d-flex justify-content-between align-items-center">
        <p class="text-muted small mt-4">Copyright © 2024&nbsp;<a class="font-weight-bold text-dark" href="https://shtinesw.com/">Shtine-SW</a>&nbsp; All rights reserved</p>
        <div >
        <img src={Pay} alt="" style={{float:"right",width:"76px",height:"auto",marginTop:"17px",marginRight:"20px"}} />        

        <img src={Download} alt="" style={{float:"right",width:"50px",height:"20px",marginTop:"15px",marginRight:"10px"}} /> 

<img src={Visa} alt="" style={{float:"right",width:"50px",height:"auto",marginRight:"10px"}} />        

</div>
    </div>
</div>


    </div>
</footer>

    <div className='mt-5'> </div>
    </>
  );
};

export default Footer;
