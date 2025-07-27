const Foot = () => {
    return ( 
        <>
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

<div className="fixed-bottom w-100 text-end p-0 m-0" style={{ overflowX: 'hidden' }}>
  <a href="https://wa.me/18768526578" className="text-decoration-none" target="_blank" rel="noopener noreferrer">
    <img src="/images/watsapp.png" id="watsApp" alt="watsapp" style={{ width: "25%", margin: "0", padding: "0" }} />
  </a>
</div>

</>
             );

        }
       
 
export default Foot;