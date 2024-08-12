import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import RightSideImg from "../../../public/images/Register.png";
import Footer from '../../component/footer/footer';
import arrow from "../../../public/images/ant-design_swap-left-outlined.png";
import WOW from 'wow.js'
import 'animate.css/animate.min.css';
import { Link } from 'react-router-dom';
function Register() {
    useEffect(() => {
        const wow = new WOW();
        wow.init();
      }, []);
    return (
        <>
            {/* Start of Register */}
            <section>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-7 d-flex justify-content-center align-items-center">
                            <div className="loginBox  wow animate__animated animate__fadeInUp" style={{boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", padding: "50px", borderRadius: "10px"}}>
                                <h2 style={{color:"#F47458",fontWeight:"bold",fontSize:"36px"}}>Logo Here</h2>
                                <p style={{opacity:"0.7",marginTop:"69px"}}>
                                Join us today!
                                </p>
                                <h1 style={{fontSize:"56px",fontWeight:"600"}}> 
                                Register
                                </h1>
                                <form style={{marginTop:"30px"}}>
                                    <div className="form-group">
                                        <label style={{fontSize:"14px",opacity:"0.9"}} htmlFor="exampleInputName">Full Name</label>
                                        <input style={{width: "478px", border: "1px solid #FFF6F4", background: "#FFF6F4", borderRadius: "5px"}} type="text" className="form-control mt-1" id="exampleInputName" placeholder="John Doe" />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label style={{fontSize:"14px",opacity:"0.9"}} htmlFor="exampleInputEmail1">Email</label>
                                        <input style={{width: "478px", border: "1px solid #FFF6F4", background: "#FFF6F4", borderRadius: "5px"}} type="email" className="form-control mt-1" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="test@gmail.com" />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label style={{fontSize:"14px",opacity:"0.9"}} htmlFor="exampleInputPassword1">Password</label>
                                        <input style={{width: "478px", border: "1px solid #FFF6F4", background: "#FFF6F4", borderRadius: "5px"}} type="password" className="form-control mt-1" id="exampleInputPassword1" placeholder="*********" />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label style={{fontSize:"14px",opacity:"0.9"}} htmlFor="exampleInputConfirmPassword1">Confirm Password</label>
                                        <input style={{width: "478px", border: "1px solid #FFF6F4", background: "#FFF6F4", borderRadius: "5px"}} type="password" className="form-control mt-1" id="exampleInputConfirmPassword1" placeholder="*********" />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label style={{fontSize:"14px",opacity:"0.9"}} htmlFor="exampleInputPhone">Phone Number</label>
                                        <input style={{width: "478px", border: "1px solid #FFF6F4", background: "#FFF6F4", borderRadius: "5px"}} type="text" className="form-control mt-1" id="exampleInputPhone" placeholder="123-456-7890" />
                                    </div>
                                    <div className='d-flex justify-content-center align-items-center' style={{marginTop:"50px"}}>
                                        <button style={{background:"#F47458",width:"150px",height:"46px", border:"1px solid #F47458", borderRadius:"23px",fontSize:"16px",fontWeight:"500"}} type="submit" className="btn btn-primary">Register <img style={{width:"24px",height:"24px"}} src={arrow} alt="" /></button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-md-5 LoginRightSide">
                            <img style={{width:"90%",marginTop:"200px",position:"relative",right:"110px"}} src={RightSideImg} alt="Register Visual" className="img-fluid remvo  wow animate__animated animate__fadeInUp" />
                        </div>
                    </div>
                </div>
            </section>
            {/* End of Register */}

            {/* Footer */}
        </>
    );
}

export default Register;
