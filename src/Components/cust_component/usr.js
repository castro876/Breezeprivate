import React, { useEffect, useState } from "react";
import { db } from "../usr_component/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';
import Foot from "../foot_component/usr_foot"
import DOMPurify from 'dompurify';
import { motion } from "framer-motion"


function Appy() {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: '',
    message: '', // Added message field
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const navigate = useNavigate(); // 👈 Initialize navigate


  // Input validation
  const validateInput = () => {
    let newErrors = {};

    // Validate first name
    if (!formData.firstName) {
      newErrors.firstName = 'First Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.firstName)) {
      newErrors.firstName = 'First Name can only contain letters';
    }


    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }

    // Validate phone number
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    // Validate message
    if (!formData.message) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const validationErrors = validateInput();

    if (Object.keys(validationErrors).length === 0) {
      // Sanitize the input data
      const sanitizedData = {
        firstName: DOMPurify.sanitize(formData.firstName),
        email: DOMPurify.sanitize(formData.email),
        phone: DOMPurify.sanitize(formData.phone),
        message: DOMPurify.sanitize(formData.message), // Sanitize message
      };

      console.log('Sanitized and validated data:', sanitizedData);
      setIsSubmitted(true);

      // Now, allow the form to be submitted to the action URL
      event.target.submit();
    } else {
      setErrors(validationErrors);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

    // Handle search input
  const [orderID, setOrderID] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleTrackOrder = async () => {
    setErrorMsg(""); // Clear previous error

    if (!orderID.trim() || orderID.trim().length > 20) {
      setErrorMsg("Please enter a valid tracking number.");
      return;
    }
  
    try {
      const querySnapshot = await getDocs(collection(db, "orders"));
      let found = false;
  
      querySnapshot.forEach((doc) => {
        if (doc.data().trackingNumber === orderID.trim().toUpperCase()) {
          found = true;
        }
      });
  
      if (found) {
        navigate(`/order/${orderID}`); //Redirect after order placed
      } else {
        setErrorMsg("Tracking number not found.");
      }
    } catch (error) {
      console.error("Error checking order ID:", error);
      setErrorMsg("An error occurred while checking the tracking number.");
    }
  };

  return (
    <div style={{"overflow":"hidden"}}>
       
       <div className="main_cont fixed-top">
          <nav className="bg-white pe-3" style={{"overflow":"hidden"}}>
            <ul>
                <a href="#home"><img src="/images/business_logo.png" alt="logo" className="img-fluid d-inline" style={{"width":"10%","transform":"scale(1.2)"}}/></a> 
              <div className="h_over d-inline fw-bold pt-4" style={{"float":"right","letterSpacing":"4px"}}>
                <a href="#home" className="nav_hid text-decoration-none text-white"><span  style={{"backgroundColor":"#054d92","padding":"100px 25px 100px 25px"}}>Home</span></a>
                <a href="#rate" className="text-decoration-none text-dark"><span  style={{"padding":"100px 25px 100px 25px"}}>Rates</span></a>
               <a href="#service" className="nav_hid text-decoration-none mx-2 text-dark"><span  style={{"padding":"100px 20px 100px 20px"}}>Service</span></a>
              <Link to={'/policy'} className="text-decoration-none mx-2 text-dark"><span  style={{"padding":"100px 25px 100px 25px"}}>Policy</span></Link>
                <a href='#contact' className="text-decoration-none mx-2 text-dark"><span  style={{"padding":"100px 15px 100px 15px"}}>Contact</span></a>
                <Link to={'/signin'} className="text-decoration-none mx-2" style={{'fontSize':'1rem'}}><button className="px-4 py-2">Login</button></Link>
              </div>
            </ul>
          </nav>
        
<nav className="mobile_cont d-md-none fixed-top">
<button style={{"backgroundColor":"#054d92"}} className="btn btn-white mx-2 my-4" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><i className="fa fa-bars" style={{"fontSize":"25px"}} aria-hidden="true"></i>
</button> <Link to={'/signin'}><button style={{"backgroundColor":"gold"}} className="btn btn-white" type="button" >Sign in</button></Link>
<a href='#home'><img src="/images/business_logo.png" alt="logo" className="img-fluid d-inline mx-4" style={{"width":"25%", "float":"right"}}/></a>
<div className="offcanvas offcanvas-start w-50" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel"><Link><img src="/images/business_logo.png" alt="logo" className="img-fluid d-inline" style={{"width":"40%", "float":"left"}}/></Link>
</h5>
    <button type="button" className="btn-close btn-danger" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="mob offcanvas-body text-white" style={{ backgroundColor: "#054d92", textAlign: "center" }}>
  <a href="#home" style={{ textDecoration: "none" }}>
    <div className="w-100 p-3 text-white" style={{ fontSize: "20px" }}>
      <i class="fa fa-home" aria-hidden="true"></i> Home
    </div>
  </a>
  <a href="#rate" style={{ textDecoration: "none" }}>
    <div className="w-100 p-3 text-white" style={{ fontSize: "20px" }}>
      <i class="fa fa-usd" aria-hidden="true"></i> Rates
    </div>
  </a>
  <a href="#service" style={{ textDecoration: "none" }}>
    <div className="w-100 p-3 text-white" style={{ fontSize: "20px" }}>
      <i class="fa fa-wifi" aria-hidden="true"></i> Service
    </div>
  </a>
  <Link to={"/policy"} style={{ textDecoration: "none" }}>
    <div className="w-100 p-3 text-white" style={{ fontSize: "20px" }}>
      <i class="fa fa-shield" aria-hidden="true"></i> Policy
    </div>
  </Link>
  <a href="#contact" style={{ textDecoration: "none" }}>
    <div className="w-100 p-3 text-white" style={{ fontSize: "20px" }}>
      <i class="fa fa-address-book-o" aria-hidden="true"></i> Contact
    </div>
  </a>
  <Link to={"/signin"} style={{ textDecoration: "none" }}>
    <div className="a_log w-100 p-3 mt-3 text-white" style={{ fontSize: "20px" }}>
      <i class="fa fa-unlock-alt" aria-hidden="true"></i> Login
    </div>
  </Link>
</div>

</div>
</nav>
        </div>
      
      <div>
      <div id="home" className="hero" style={{"padding":"120px 0px 50px 0px","height":"auto","textAlign":"center"}}>
        <motion.div
        initial={{x:-50,opacity:0}}
        animate={{x:0,opacity:1.5}}
        transition={{delay:1.5,duration:1, stiffness:120}}
        >
        <h4 className="fw-bold mt-5" style={{"color":"gold"}}>Ship With Us</h4>
        <h3 className="mb-4 fw-bold" style={{"color":"white"}}>Our Customer Satisfaction Is All That Matters</h3>
        </motion.div>
        <div class="inp_cont input-group px-3 mb-1 position-relative">
  <input type="text" onChange={(e) => setOrderID(e.target.value)} class="form-control mobile_cont" placeholder="Tracking Number" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
  <div class="input-group-append">
    <span onClick={handleTrackOrder} class="input-group-text text-white text-decoration-none" id="basic-addon2" style={{"backgroundColor":"#054d92"}}>Track Order</span>
  </div>
</div>
{errorMsg && (
  <p className="text-danger text-center mt-2 fs-5">{errorMsg}</p>
)}
<Link to="/signup"><button className="text-white p-2 px-5 mt-3" style={{"backgroundColor":"#054d92"}}>Sign up</button></Link>
</div>
      </div>


  <div class="container my-5" id="about" >
  <div class="row">
    <div class="col col d-none d-md-block">
    <img src="/images/about_img.jpg" alt="lady" className="A_img img-fluid" style={{"width":"100%"}}/>
     <div className="text-center py-3" style={{"backgroundColor":"#054d92"}}><p className="fw-bold fs-5 text-white">Very Fast Delivery</p></div>
    </div>
    <div class="col">
      <div className="abo_cont">
      <p className="fw-bold mb-0" style={{"color":"gold"}}>About Us</p>
      <h1 className="head fw-bold text-white">Your Trusted Partner for Shipping</h1>
      <p className="head text-white">At Breeze Express, we take pride in being your go-to courier service. We're dedicated to delivering fast, hassle-free, and convenient shipping solutions. Our goal is to ensure your satisfaction when sending packages from the United States to Jamaica. Trust us to handle your shipments and provide you with the best shipping experience.</p>
    </div>
    </div>
  </div>
</div>


  <div className="container mb-5" id="service">
  <div class="container">
  <div className="text-center mb-3">
  <p className="fw-bold mb-0" style={{"color":"gold"}}>Services</p>
  <h1 className="fw-bold">What We Offer</h1>
  </div>
  <div class="row g-4">
    <div class="col-sm">
     <div class="mobile cont border text-center mobile_cont">
     <img src="/images/contact_img.jpg" alt="lady" className="img-fluid" style={{"width":"100%"}}/>
     <i class="fa fa-gift" aria-hidden="true"></i><p className="fw-bold">TRACK PACKAGE </p>
      <p>Track your package in realtime. Once package is received at our facility in Florida, USA. First, sign in to your account from our website and match the tracking info provided by your reatailer.</p>
      <Link to={'/signup'}><button className="s_btn text-white" style={{"backgroundColor":"#054d92"}}>Sign up</button></Link>
      </div>
    </div>
    <div class="col-sm">
    <div class="mobile cont border text-center mobile_cont">
     <img  src="/images/card_img.jpg" alt="lady" className="img-fluid" style={{"width":"100%","height":"229px"}}/>
     <i class="fa fa-credit-card" aria-hidden="true"></i>
      <p className="fw-bold">NO CARDS</p>
      <p>Send us links via watsapp of any items you need online and we’ll order it for your. Don’t miss out on the opportunity to simplify your online shopping experience with just one link . We order from all sites.</p>
      <Link to={'/signup'}><button className="text-white" style={{"backgroundColor":"#054d92"}}>Sign up</button></Link>
      </div>
    </div>
    <div class="col-sm">
    <div class="mobile cont border text-center mobile_cont">
     <img src="/images/delivery.jpg" alt="lady" className="img-fluid" style={{"width":"100%"}}/>
     <i class="fa fa-truck" aria-hidden="true" style={{"color":"gold"}}></i>
      <p className="fw-bold">ISLANDWIDE DELIVERY</p>
      <p>Enjoy having your packages delivered to you.We deliver packages islandwide via Knutsford Express and Jamaica post. Our team of professionals will assure safe, speedy and hassle free delivery.</p>
      <Link to={'/signup'}><button className="text-white" style={{"backgroundColor":"#054d92"}}>Sign up</button></Link>
      </div>
    </div>
  </div>
</div>
  </div>

 
 
  <div class="container my-5">
  <div class="row">
    <div class="col col d-none d-md-block">
    <img src="/images/ship.jpg" alt="lady" className="A_img img-fluid" style={{"width":"100%"}}/>
     <div className="text-center py-3" style={{"backgroundColor":"#054d92"}}><p className="fw-bold fs-5 text-white">Very Fast Delivery</p></div>
    </div>
    <div class="col">
      <div className="abo_cont">
      <p className="fw-bold mb-0" style={{"color":"gold"}}>Why Choose Us</p>
      <h1 className="h1_1 fw-bold text-white">Your Trusted Partner for Shipping</h1>

      <div class="container">
  <div class="row g-2 text-center text-white">
    <div class="col-sm-6">
      <div class="p-3" style={{"backgroundColor":"#054d92"}}>
      <i class="fa fa-phone" aria-hidden="true" style={{"color":"gold"}}></i>
       <p className="text-white">24/7 SUPPORT</p>
        </div>
    </div>
    <div class="col-sm-6">
      <div class="p-3" style={{"backgroundColor":"#054d92"}}>
      <i class="fa fa-handshake-o" aria-hidden="true" style={{"color":"gold"}}></i>
        <p className="text-white">HASSLE FREE</p>
        </div>
    </div>
    <div class="col-sm-6">
      <div class="p-3" style={{"backgroundColor":"#054d92"}}>
      <i class="fa fa-clock-o" aria-hidden="true" style={{"color":"gold"}}></i>
       <p className="text-white">SPEEDY SERVICE</p>
        </div>
    </div>
    <div class="col-sm-6">
      <div class="p-3 c_cont" style={{"backgroundColor":"#054d92"}}>
      <i class="fa fa-universal-access" aria-hidden="true" style={{"color":"gold"}}></i>
       <p className="text-white">CONVENIENT</p>
      </div>
    </div>
  </div>
</div>
    </div>
    </div>
  </div>
</div>
 


<div class="container mb-5">
  <div class="row g-2 text-center">
  <p className="fw-bold mb-0" style={{"color":"gold"}}>How It Works</p>
      <h1 className="fw-bold text-dark">Making Online Shopping EASY  BREEZY  In 3 Steps</h1>
    <div class="col-sm-4">
      <div class="p-3" style={{"backgroundColor":"#054d92"}}>
        <h3 className="fw-bold text-white">1</h3>
        </div>
        <p>Register to get your free USA shipping address via email and enjoy access to millions of products online.</p>
        <Link to={'/signup'}><button className="h_btn text-white" style={{"backgroundColor":"#054d92"}}>Sign up</button></Link>
    </div>
    <div class="col-sm-4">
      <div class="p-3" style={{"backgroundColor":"#054d92"}}>
      <h3 className="fw-bold text-white">2</h3>
        </div>
        <p>Use the provided mailing address to shop online from top sites like Amazon, eBay, SHEIN, Walmart, Fashion Nova, and more.</p>
        <Link to={'/signup'}><button className="text-white" style={{"backgroundColor":"#054d92"}}>Sign up</button></Link>
    </div>
    <div class="col-sm-4">
      <div class="p-3" style={{"backgroundColor":"#054d92"}}>
      <h3 className="fw-bold text-white">3</h3>
        </div>
        <p>Once your package reaches Breeze Express, it will be shipped to Jamaica, with pickup locations available across the island.</p>
        <Link to={'/signup'}><button className="text-white" style={{"backgroundColor":"#054d92"}}>Sign up</button></Link>
    </div>
  </div>
</div>

   
   <div className="container mb-5 text-center" id="rate">
   <p className="fw-bold mb-0" style={{"color":"gold"}}>Prices</p>
      <h1 className="fw-bold">Shipping Rates</h1>
   <table class="table table-warning table-striped table-hover w-75 m-auto ">
  <thead>
    <tr>
      <th scope="col">Weight</th>
      <th scope="col">Rate</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>0-2 lbs</td>
      <td>$750</td>
    </tr>
    <tr>
      <td>3 lbs</td>
      <td>$1700</td>
    </tr>
    <tr>
      <td>4 lbs</td>
      <td>$2100</td>
    </tr>
    <tr>
      <td>5 lbs</td>
      <td>$2400</td>
    </tr>
    <tr>
      <td>6 lbs</td>
      <td>$2850</td>
    </tr>
    <tr>
      <td>7 lbs</td>
      <td>$3300</td>
    </tr>
    <tr>
      <td>8 lbs</td>
      <td>$3650</td>
    </tr>
    <tr>
      <td>9 lbs</td>
      <td>$4100</td>
    </tr>
    <tr>
      <td>10 lbs</td>
      <td>$4460</td>
    </tr>
    <tr>
      <td>11-20 lbs</td>
      <td>$6130</td>
    </tr>
    <tr>
      <td>21-30 lbs</td>
      <td>$9630</td>
    </tr>
    <tr>
      <td>31-50 lbs</td>
      <td>$13388</td>
    </tr>
    <tr>
      <td>50 lbs</td>
      <td>$28300</td>
    </tr>
  </tbody>
</table>
   </div>


   <div className="contact_cont container_fluid mb-5" id="contact">
      <div className="py-5 text-center">
        <p className="fw-bold mb-0" style={{ color: 'gold' }}>Contact</p>
        <h1 className="fw-bold">Get In Touch</h1>
        <div className="formBox_1">
          <form onSubmit={handleSubmit} className="p-3" style={{ margin: 'auto' }} action="https://formsubmit.co/expressbreeze95@gmail.com" method="POST">
            <div className="mb-3" style={{ textAlign: 'center' }}>
              <img src="/images/business_logo.png" alt="logo" className="img-fluid d-inline" style={{ width: '30%', transform: 'scale(1.2)', margin: 'auto' }} />
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="firstName"
                className="form-control"
                placeholder="Name"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
            </div>

            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>

            <div className="mb-3">
              <input
                type="number"
                name="phone"
                className="form-control"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
              />
              {errors.phone && <small className="text-danger">{errors.phone}</small>}
            </div>

            <div className="mb-3">
              <textarea
                name="message"
                className="form-control"
                placeholder="Your Message"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
              />
              {errors.message && <small className="text-danger">{errors.message}</small>}
            </div>

            <input type="hidden" name="_next" value="https://breezeexpressonline.com" />
            <input type="hidden" name="_template" value="box" />
            <input type="hidden" name="_captcha" value="false" />
            
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#054d92' }}>
              Submit
            </button>
            {isSubmitted && <p className="text-success mt-3">Message sent successfully!</p>}
          </form>
        </div>
      </div>
    </div>

 <Foot/>
 




    </div>
  );
}

export default Appy;
