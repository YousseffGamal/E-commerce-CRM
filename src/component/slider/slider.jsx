import React, { useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Offer1 from "../../../public/images/offer1.webp";
import Offer2 from "../../../public/images/offer2.webp";
import Offer3 from "../../../public/images/offer3.webp";
import Sun from "../../../public/images/sunglass.webp";
import Sport from "../../../public/images/sports.webp"; 
import Bag from "../../../public/images/bags.webp";
import Sneakers from "../../../public/images/sneakers.webp";
import Woman from "../../../public/images/woman.webp";
import Man from "../../../public/images/man.webp";
import Watch from "../../../public/images/watch.webp";
import Kid from "../../../public/images/kid.webp";



import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Carousel } from 'react-bootstrap';
import WOW from 'wow.js'

import 'animate.css/animate.min.css';

const Slider = () => {
 
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSlide = (index) => {
      setActiveIndex(index);
    };
    useEffect(() => {
      const wow = new WOW();
      wow.init();
    }, []);
  
  return (
    <>


{/* end of products */}
 {/* Start of slider */}
<section  className='mt-5 ' id='slide'>
  <div className="container-fluid  wow animate__animated animate__fadeInUp">
    <div className="row">
      <div className="col ">
      <Carousel className="wide-slider">
        <Carousel.Item>
        <div style={{height:"100%"}} className="img-container">
        <img
            className="d-block w-100"
            src={Offer1}
            alt="First slide"
            style={{ objectFit: 'cover', height: '400px' }}
          />                  <div className="glass-effect"></div>
                </div>
        
          <Carousel.Caption className="next-item">
            {/* <h3>Next Item</h3>
            <p>Description of the next item</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <div style={{height:"100%"}} className="img-container">
        <img
            className="d-block w-100"
            src={Offer2}
            alt="Second slide"
            style={{ objectFit: 'cover', height: '400px' }}

          />               <div className="glass-effect"></div>
                </div>
        
          <Carousel.Caption className="prev-item">
            {/* <h3>Previous Item</h3>
            <p>Description of the previous item</p> */}
          </Carousel.Caption>
          <Carousel.Caption className="next-item">
            {/* <h3>Next Item</h3>
            <p>Description of the next item</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <div style={{height:"100%"}} className="img-container">
        <img
            className="d-block w-100"
            src={Offer3}
            alt="Third slide"
            style={{ objectFit: 'cover', height: '400px' }}
          />              <div className="glass-effect"></div>
                </div>
      
          <Carousel.Caption className="prev-item">
            {/* <h3>Previous Item</h3>
            <p>Description of the previous item</p> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </div>
    </div>
  </div>
</section>
{/* second slider */}
<section>
<div className="container-fluid mt-5 ">
    <div className="row">
        <div className="col">
        <h3 className="h3 fw-bold p-3  wow animate__animated animate__fadeInUp">Shop By Category</h3>

        </div>
    </div>
    <div className="row  wow animate__animated animate__fadeInUp">
        <div className="col">
        <Carousel interval={null} className="small-slider">
  <Carousel.Item>
    <div className="d-flex justify-content-around">
      <img src={Sport} alt="First" className="carousel-img" />
      <img src={Sun} alt="First" className="carousel-img" />
      <img src={Bag} alt="First" className="carousel-img" />
      <img src={Sneakers} alt="First" className="carousel-img" />
      <img src={Woman} alt="First" className="carousel-img" />
      <img src={Man} alt="Second" className="carousel-img" />
      <img src={Watch} alt="Third" className="carousel-img" />
      <img src={Kid} alt="Fourth" className="carousel-img" />
    </div>
  </Carousel.Item>
  <Carousel.Item>
  <div className="d-flex justify-content-around">
  <img src={Kid} alt="Fourth" className="carousel-img" />
  <img src={Watch} alt="Third" className="carousel-img" />
  <img src={Woman} alt="First" className="carousel-img" />
  <img src={Sneakers} alt="First" className="carousel-img" />
  <img src={Bag} alt="First" className="carousel-img" />
  <img src={Sun} alt="First" className="carousel-img" />
  <img src={Man} alt="Second" className="carousel-img" />
      <img src={Sport} alt="First" className="carousel-img" />
   

 


 
    </div>
  </Carousel.Item>
</Carousel>
        </div>
    </div>
</div>
</section>

      {/* End of slider */}
    <div className='mt-5'> </div>
    </>
  );
};

export default Slider;
