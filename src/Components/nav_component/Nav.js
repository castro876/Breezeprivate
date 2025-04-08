import { Link } from "react-router-dom/cjs/react-router-dom";

const Nav = () => {
    return ( 
        <div className="main_cont fixed-top">
          <nav className="nav_cont">
            <ul>
                <Link to={"#home"} ><img src="/images/business_logo.png" alt="logo" className="img-fluid d-inline" style={{"width":"10%","transform":"scale(1.2)"}}/></Link>
              <div className="h_over d-inline fw-bold mt-4" style={{"float":"right","letterSpacing":"4px"}}>
                <Link to={"#home"}  className="text-decoration-none text-white"><span  style={{"backgroundColor":"#054d92","padding":"50px 15px 35px 15px"}}>Home</span></Link>
                <Link to={'/#about'} className="text-decoration-none text-dark"><span  style={{"padding":"50px 15px 35px 15px"}}>About</span></Link>
                <Link to={'/#service'} className="text-decoration-none mx-2 text-dark"><span  style={{"padding":"50px 15px 35px 15px"}}>Service</span></Link>
                <Link to={'/#policy'} className="text-decoration-none mx-2 text-dark"><span  style={{"padding":"50px 25px 35px 25px"}}>Policy</span></Link>
                <Link to={'/#contact'} className="text-decoration-none mx-2 text-dark"><span  style={{"padding":"50px 15px 35px 15px"}}>Contact</span></Link>
                <Link to={'/signin'} className="text-decoration-none mx-2" style={{'fontSize':'1rem'}}><button className="px-4 py-2">Login</button></Link>
              </div>
            </ul>
          </nav>
        


<nav className="mobile_cont d-md-none fixed-top">
<button style={{"backgroundColor":"#054d92"}} className="btn btn-white mx-2 my-4" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><i className="fa fa-bars" style={{"fontSize":"25px"}} aria-hidden="true"></i>
</button> <button style={{"backgroundColor":"gold"}} className="btn btn-white" type="button" >Sign in</button>
<Link><img src="/images/business_logo.png" alt="logo" className="img-fluid d-inline mx-4" style={{"width":"25%", "float":"right"}}/></Link>
<div className="offcanvas offcanvas-start w-50" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel"><Link><img src="/images/business_logo.png" alt="logo" className="img-fluid d-inline" style={{"width":"40%", "float":"left"}}/></Link>
</h5>
    <button type="button" className="btn-close btn-danger" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body text-white" style={{"backgroundColor":"#054d92", "textAlign":"center"}}>
              <div className="w-100 p-3" style={{ fontSize: "20px" }}>
                <i className="fa fa-user-o" aria-hidden="true"></i> Home
              </div>
              <div className="w-100 p-3" style={{ fontSize: "20px" }}>
                <i className="fa fa-user-o" aria-hidden="true"></i> About
              </div>
              <div className="w-100 p-3" style={{ fontSize: "20px" }}>
                <i className="fa fa-user-o" aria-hidden="true"></i> Service
              </div>
              <div className="w-100 p-3" style={{ fontSize: "20px" }}>
                <i className="fa fa-user-o" aria-hidden="true"></i> Policy
              </div>
              <div className="w-100 p-3" style={{ fontSize: "20px" }}>
                <i className="fa fa-user-o" aria-hidden="true"></i> Contact
              </div>  
              <div className="w-100 p-3" style={{ fontSize: "20px" }}>
                <i className="fa fa-user-o" aria-hidden="true"></i> Login
              </div>
              </div>
</div>
</nav>
        </div>
     );
}
 
export default Nav;