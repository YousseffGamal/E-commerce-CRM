import React, { useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import RightSideImg from "../../../public/images/Login Bg.png"
import Footer from '../../component/footer/footer';
import arrow from "../../../public/images/ant-design_swap-left-outlined.png"
import WOW from 'wow.js'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/authContext';
import 'animate.css/animate.min.css';
import axiosInstance from '../../axios';
function Login() {
  const {login} = useAuth()
    const navigate = useNavigate();
        const [formData, setFormData] = useState({
          email: '',
          password: '',
        });
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({
            ...formData,
            [name]: value,
          });
          
        };

        const handleSubmit = async (e) => {
          e.preventDefault();
       await login(formData)
       navigate('crm')
      }


  useEffect(() => {
 
  }, []);
    return (
        <>
            {/* Start of login */}
            <section>
                <div className="container-fluid">
                   
                    <div className="row ">
                    <div className="col-md-7 d-flex justify-content-center align-items-center" >
    <div className="loginBox wow animate__animated animate__fadeInUp" style={{boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", padding: "50px", borderRadius: "10px"}}>
        <h2 style={{color:"#F47458",fontWeight:"bold",fontSize:"36px"}}>Logo Here</h2>
        <p style={{opacity:"0.7",marginTop:"69px"}}>
        Welcome back !!!
        </p>
        <h1 style={{fontSize:"56px",fontWeight:"600"}}> 
        Sing in 
        </h1>
        <form style={{marginTop:"30px"}} onSubmit={handleSubmit}>
            <div className="form-group">
                <label  style={{fontSize:"14px",opacity:"0.9"}} htmlFor="exampleInputEmail1">Email</label>
                <input style={{width: "478px", border: "1px solid #FFF6F4", background: "#FFF6F4", borderRadius: "5px"}} type="email" className="form-control mt-1" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Test@gmail.com " name="email" value={formData.email}  onChange={handleChange} required />
            </div>
            <div className="form-group mt-4">
                <label style={{fontSize:"14px",opacity:"0.9"}} htmlFor="exampleInputPassword1">Password</label>
                <input style={{width: "478px", border: "1px solid #FFF6F4", background: "#FFF6F4", borderRadius: "5px"}} type="password" className="form-control mt-1" id="exampleInputPassword1" placeholder="*********" name="password" value={formData.password}   onChange={handleChange} required />
            </div>
            <div className='d-flex justify-content-center align-items-center' style={{marginTop:"50px"}}>
            <button style={{background:"#F47458",width:"150px",height:"46px", border:"1px solid #F47458", borderRadius:"23px",fontSize:"16px",fontWeight:"500"}} type="submit" className="btn btn-primary">Sign In <img style={{width:"24px",height:"24px"}} src={arrow} alt="" /></button>


            </div>
          
        </form>
    </div>
</div>

                        <div className="col-md-5 LoginRightSide">
                            <img style={{width:"600px",marginTop:"200px",position:"relative",right:"110px"}} src={RightSideImg} alt="Login Visual" className="img-fluid remvo wow animate__animated animate__fadeInUp" />
                        </div>
                    </div>
                </div>
            </section>
            {/* End of login */}

            {/* <div className="mt-5"></div> */}

            {/* Footer */}
        </>
    );
}

export default Login;
