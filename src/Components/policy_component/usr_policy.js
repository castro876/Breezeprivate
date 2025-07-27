import { Link } from 'react-router-dom';



const Policy = () => {
    return ( 
        <>
             
       <div className="main_cont fixed-top">
       <nav className="bg-white pe-3" style={{"overflow":"hidden"}}>
            <ul>
                <a href="/"><img src="/images/business_logo.png" alt="logo" className="img-fluid d-inline" style={{"width":"10%","transform":"scale(1.2)"}}/></a> 
              <div className="h_over d-inline fw-bold pt-4" style={{"float":"right","letterSpacing":"4px"}}>
                <a href="/" className="nav_hid text-decoration-none text-white"><span  style={{"backgroundColor":"#054d92","padding":"100px 25px 100px 25px"}}>Home</span></a>
                <a href="/" className="text-decoration-none text-dark"><span  style={{"padding":"100px 25px 100px 25px"}}>Rates</span></a>
               <a href="/" className="nav_hid text-decoration-none mx-2 text-dark"><span  style={{"padding":"100px 20px 100px 20px"}}>Service</span></a>
              <Link to={'/policy'} className="text-decoration-none mx-2 text-dark"><span  style={{"padding":"100px 25px 100px 25px"}}>Policy</span></Link>
                <a href='/' className="text-decoration-none mx-2 text-dark"><span  style={{"padding":"100px 15px 100px 15px"}}>Contact</span></a>
                <Link to={'/signin'} className="text-decoration-none mx-2" style={{'fontSize':'1rem'}}><button className="px-4 py-2">Login</button></Link>
              </div>
            </ul>
          </nav>
        
        


<nav className="mobile_cont d-md-none fixed-top">
<button style={{"backgroundColor":"#054d92"}} className="btn btn-white mx-2 my-4" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><i className="fa fa-bars" style={{"fontSize":"25px"}} aria-hidden="true"></i>
</button> <Link to={'/signin'}><button style={{"backgroundColor":"gold"}} className="btn btn-white" type="button" >Sign in</button></Link>
<a href='/'><img src="/images/business_logo.png" alt="logo" className="img-fluid d-inline mx-4" style={{"width":"25%", "float":"right"}}/></a>
<div className="offcanvas offcanvas-start w-50" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel"><Link><img src="/images/business_logo.png" alt="logo" className="img-fluid d-inline" style={{"width":"40%", "float":"left"}}/></Link>
</h5>
    <button type="button" className="btn-close btn-danger" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="mob offcanvas-body text-white" style={{ backgroundColor: "#054d92", textAlign: "center" }}>
  <a href="/" style={{ textDecoration: "none" }}>
    <div className="w-100 p-3 text-white" style={{ fontSize: "20px" }}>
      <i class="fa fa-home" aria-hidden="true"></i> Home
    </div>
  </a>
  <a href="/" style={{ textDecoration: "none" }}>
    <div className="w-100 p-3 text-white" style={{ fontSize: "20px" }}>
      <i class="fa fa-usd" aria-hidden="true"></i> Rates
    </div>
  </a>
  <a href="/" style={{ textDecoration: "none" }}>
    <div className="w-100 p-3 text-white" style={{ fontSize: "20px" }}>
      <i class="fa fa-wifi" aria-hidden="true"></i> Service
    </div>
  </a>
  <Link to={"/policy"} style={{ textDecoration: "none" }}>
    <div className="w-100 p-3 text-white" style={{ fontSize: "20px" }}>
      <i class="fa fa-shield" aria-hidden="true"></i> Policy
    </div>
  </Link>
  <a href="/" style={{ textDecoration: "none" }}>
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


      <div className='dBox_1 px-3 pb-5 text-center' style={{"paddingTop":"160px"}}>
        <div className='text-center'>
        <p style={{"color":"gold","fontWeight":"bold","lineHeight":"2px"}}>policy</p>
        <h1>Privacy Policy</h1>


        <p>At Breeze Express, your privacy is of utmost importance. This Privacy Policy outlines the types of information we collect, how it is used, and the measures we take to protect your data.</p>
        <b>Information We Collect</b><br />

        Personal Information: When you use our services, we may collect personal information such as your name, contact details, shipping address, and payment information. <br /><br />
        Package Information: We collect details regarding your shipments, including package weight, dimensions, and destination. <br /><br />
        Usage Data: Breeze Express may collect non-personal information related to how you interact with our website or app, such as browser type, IP address, and referring URLs. <br /><br />


        <b>How We Use Your Information</b>
        <div>
        <p>-To process your shipments and deliver packages efficiently. <br /><br />
          -To communicate with you regarding your shipments and any changes to our services. <br /><br />
          -For internal analytics to improve our services and ensure security. <br /><br />
          -To comply with legal requirements, including customs regulations.</p></div>
       
          <b>Data Security</b>
           
           <p>We implement industry-standard practices to safeguard your information from unauthorized access or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
       
          <b>Data Retention</b>
           <p>Your personal information is retained only for as long as necessary to provide you with our services and comply with legal obligations.</p><br />

           <b>Third-Party Disclosure</b>
     
           <p>We do not sell, trade, or otherwise transfer your personal information to outside parties, except when necessary to complete your shipment or comply with the law.</p><br />
            <p>By using our services, you agree to the collection and use of your information as outlined in this policy.</p><br />
          
            <p style={{"color":"gold","fontWeight":"bold","lineHeight":"2px"}}>T&C</p>
            <h3>Terms & Conditions</h3>

            <p>These Terms & Conditions govern your use of the services provided by Breeze Express ("we," "us," "our"). By using our services, you agree to comply with and be bound by these terms.</p>

            <p>Service Scope: Breeze Express provides package forwarding, shipping, and secure storage services. We are not responsible for delays caused by external factors beyond our control, including but not limited to customs clearance, flight delays, and other operational issues.</p>

            <b>Customer Responsibilities</b>
             
           <p>-Customers are responsible for providing accurate shipping details and any necessary customs information. <br /><br />
-Customers agree to pay all applicable shipping and handling fees as determined at the time of the shipment. <br /><br />
-Any prohibited items or incorrectly declared goods will be the responsibility of the customer.</p>

       <b>Storage Policy</b>
    
     <p>-Breeze Express stores uncollected packages for a maximum of 7 days without additional charge. <br /><br />
-After these 7 days, a storage fee of JM$250 per day is applied for each day the package is not collected. <br /><br />
-After 30 days, the package will be considered unclaimed and will be disposed of without further notice</p>
       
      <b>Order Placement on Behalf of Customers</b> 
       
       <p>-When placing orders on customers' behalf, Breeze Express is only responsible for:</p>
       
       <p>-Placing the order from the link sent by the customer. <br /><br />
          -Shipping packages safely. <br /><br />
         -Storing packages securely.</p>
       
       <p>Breeze Express is not liable for any issues that arise from incorrect links or product details provided by the customer.</p>
       
         <b>Shipping Schedule</b>
          
         <p>Breeze Express ships packages on Mondays, Tuesdays, Thursdays, and Saturdays. If there are any delays that are out of our control (such as flight delays, customs clearance, etc.), we do not provide refunds unless the package is lost or damaged by the Breeze Express team.</p>

          <b>Damages and Lost Packages</b>

           <p>We take utmost care to ensure your packages are delivered safely. However, Breeze Express will only provide compensation or refunds for packages that are lost or damaged due to negligence on our part. No compensation is provided for delays caused by external factors.</p>
 
          <b>Amendments to the Terms</b>
   
          <p>Breeze Express reserves the right to modify or update these Terms & Conditions at any time without prior notice. Customers are encouraged to review the Terms regularly.</p>

          <p>Thank You for Choosing Breeze Express
          By using our services, you acknowledge that you have read and agree to these Terms & Conditions.</p>

        <p>If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:ship@breezeexpress.online" style={{"color": "blue"}}>ship@breezeexpress.online</a>
     </p>
          
        </div>
      </div>
    
      <div className="body-footer text-center text-white" style={{"backgroundColor":"#054d92"}}>
            <footer className="w-100 py-4 flex-shrink-0">
                <div className="container py-4">
                    <div className="row gy-4 gx-5">
                        <div className="col-lg-4 col-md-6">
                            <h5 className="h1 text-white">Contact Us</h5>
                            <a href="tel:+18762372548" className="text-decoration-none me-2" style={{'fontSize':'1rem'}}><p className="small text-white"> <i class="fa fa-phone fs-5 fw-bold text-danger" aria-hidden="true"></i> Call: (876) 237-2548</p></a>
                            <a href="https://wa.me/18768526578" className="text-decoration-none me-2" target="_blank"><p className="small text-white"> <i class="fa fa-whatsapp fs-5 fw-bold text-success" aria-hidden="true"></i> Watsapp: (876) 852-6578</p></a>
                            <a href="mailto:ship@breezeexpress.online" className="text-decoration-none mx-1" style={{'fontSize':'1rem'}}><p className="small text-white"><i class="fa fa-envelope fs-5 fw-bold" aria-hidden="true"></i> Email: ship@breezeexpress.online </p></a>
                            <p><i class="fa fa-twitter-square me-3" aria-hidden="true"></i> 
                          <a href="https://www.instagram.com/breezeexpressja?igsh=MTRpbDd2eTZ3endxOQ=="  className="text-decoration-none text-white"><i class="fa fa-instagram me-3" aria-hidden="true"></i></a> 
                            <i class="fa fa-facebook-square me-3" aria-hidden="true"></i>
                            </p>   
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <h5 className="text-white mb-3">Menu</h5>
                            <ul className="list-unstyled text-dark">
                                <li><a href="#">Home</a></li>
                                <li><a href="#about">About</a></li>
                                <li><a href="/signup">Get started</a></li>
                                <li><a href="/signin" target={'_blank'}>Login</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <h5 className="text-white mb-3">Menu</h5>
                            <ul className="list-unstyled text-dark">
                                <li><a href="#">Home</a></li>
                                <li><a href="#service">Services</a></li>
                                <li><a href="/signup">Get started</a></li>
                                <li><a href="/signup" target={'_blank'}>Register</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-6">
                        <h3 className="h1 text-white">Breeze Express</h3>
                            <img src="/images/company_logo.jpeg" alt="logo" className="img-fluid d-inline my-2" style={{"width":"40%","transform":"scale(1.2)"}}/>
                            <p className="small" style={{"color":"gold"}}>"Swift Shipping, Smooth Sailing."</p>
                        </div>
                    </div>
                </div>
                <p className="small text-dark mb-0">&copy; Copyrights. All rights reserved. <a className="text-primary" href="www.breezeexpressonline.com" target={'_blank'}>breezeexpressonline.com</a></p>
            </footer>
                </div>

        </>
     );
}
 
export default Policy;