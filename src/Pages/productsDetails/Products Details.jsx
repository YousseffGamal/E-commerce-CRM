import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../../component/Navbar/navbar';
import Footer from '../../component/Footer/footer';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import WOW from 'wow.js'
import 'animate.css/animate.min.css';
import productsImg from '../../../public/images/p-5.webp';
import smallImg1 from '../../../public/images/Proucts Details.png';
import smallImg2 from '../../../public/images/p-8.webp';
import smallImg3 from '../../../public/images/p-4.webp';


const ProductsDetails = () => {
  useEffect(() => {
    const wow = new WOW();
    wow.init();
  }, []);

  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(productsImg);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const colors = ['#e86c25', '#ffa5b4', '#8224e3', '#dd3333'];
  const smallImages = [smallImg1, smallImg2, smallImg3];

  return (
    <>
      {/* navbar */}
      <Navbar />
      {/* start of Product Details */}
      <section style={{ marginTop: "70px" }}>
        <div className="container">
          <div className="row  wow animate__animated animate__fadeInDown">
           
            <div className="col-md">
              <div className='remf' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} className='rema'>
  {smallImages.map((image, index) => (
    <img
      key={index}
      src={image}
      alt={`Small Image ${index + 1}`}
      style={{ width: "70%", marginBottom: "10px", cursor: "pointer"}}
      onClick={() => setMainImage(image)}
    />
  ))}
</div>
                <img className='ProductDetailsImg' style={{ width: "475px", height: "617px", borderRadius: "10px" }} src={mainImage} alt="" />
              </div>
            </div>
            <div className="col-md">
              <h1 style={{ fontWeight: "bold", fontSize: "1.875rem", lineHeight: "2.25rem" }}>Maniac Red Boys</h1>
              <p style={{ fontSize: "0.899rem", opacity: "0.8" }}>
                Children’s clothing/ kids wear is usually more casual than adult clothing, fit play and rest. Hosiery is <br />
                usually used. More recently, however, tons of childrenswear is heavily influenced by trends in adult  <br />
                fashion
              </p>
              <h1 style={{ fontSize: "36px", fontWeight: "bold" }}>
                $40.00 <span style={{ textDecoration: "line-through", color: "#999999", fontSize: "20px", fontWeight: "normal" }}>$50.00</span>
              </h1>
              <div style={{ opacity: "0.4" }} className='mt-5'>
                <hr />
              </div>
              <h3 style={{ fontSize: "18px" }} className='mt-5'>Size</h3>
              <ul style={{ display: "flex", listStyle: "none", gap: "20px", marginTop: "20px" }}>
                <li className='ProductsSize'>S</li>
                <li className='ProductsSize'>M</li>
                <li className='ProductsSize'>L</li>
                <li className='ProductsSize'>XL</li>
              </ul>
              <h3 style={{ fontSize: "18px", fontWeight: "600" }} className='mt-5'>Colors</h3>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                {colors.map((color, index) => (
                  <div key={index} style={{ width: "30px", height: "30px", backgroundColor: color, borderRadius: ".25rem", cursor: "pointer" }} className='borde'></div>
                ))}
              </div>
              <div style={{ opacity: "0.4" }} className='mt-5'>
                <hr />
              </div>
              <div style={{ marginTop: "20px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button className='borde' onClick={decrementQuantity} style={{ width: "3rem", backgroundColor: "transparent", height: "46px" }}><svg xmlns="http://www.w3.org/2000/svg" width="12px" height="2px" viewBox="0 0 12 1.5"><rect data-name="Rectangle 970" width="12px" height="2px" fill="currentColor"></rect></svg></button>
                  <span className='borde' style={{ width: "6rem", backgroundColor: "transparent", justifyContent: "center", display: "flex", height: "46px", paddingTop: "10px" }}>{quantity}</span>
                  <button className='borde' onClick={incrementQuantity} style={{ marginRight: "10px", width: "3rem", backgroundColor: "transparent", height: "46px" }}><svg data-name="plus (2)" xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" viewBox="0 0 12 12"><g data-name="Group 5367"><path data-name="Path 17138" d="M6.749,5.251V0h-1.5V5.251H0v1.5H5.251V12h1.5V6.749H12v-1.5Z" fill="currentColor"></path></g></svg></button>
                  <button type="button" style={{ width: "60%", height: "48px", fontSize: "14px" }} class="btn btn-dark">Add to cart</button>

                </div>
              </div>
              <div style={{ opacity: "0.4" }} className='mt-5'>
                <hr />
              </div>
            </div>
          </div>
     
       
          
        </div>
      </section>
      {/* End of Product Details */}

      <div className='mt-5'></div>

      {/* footer */}
      <Footer />
    </>
  );
};

export default ProductsDetails;
