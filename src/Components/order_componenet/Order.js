import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../usr_component/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import FootComp from "../foot_component/usr_foot";

const OrderComp = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderByOrderID = async () => {
      try {
        const q = query(collection(db, "orders"), where("trackingNumber", "==", id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const orderData = querySnapshot.docs[0].data();
          setOrder(orderData);
        } else {
          alert("Order not found.");
        }
      } catch (error) {
        alert("Error fetching order: " + error.message);
      }
    };

    if (id) {
      fetchOrderByOrderID();
    }
  }, [id]);

  return (
    <div style={{"overflow":"hidden"}}>
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
      <div className="container my-5 py-5">
        <h3 className="mb-4 mt-5 text-danger">Order Details</h3>

        {order ? (
          <>
            {/* Order Details Table */}
            <table className="table table-bordered mb-4">
              <tbody>
                <tr>
                <th>Customer Name</th>
                  <td>{order.name || "N/A"}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{order.email || "N/A"}</td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>{order.phoneNumber || "N/A"}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>{order.status}</td>
                </tr>
                <tr>
                  <th>Receive Date</th>
                  <td>{order.receiveDate || "N/A"}</td>
                </tr>
                <tr>
                  <th>Merchant</th>
                  <td>{order.merchant || "N/A"}</td>
                </tr>
                <tr>
                  <th>Tracking Number</th>
                  <td>{order.trackingNumber || "N/A"}</td>
                </tr>
              </tbody>
            </table>

            {/* Ordered Items Table */}
            <h5 className="text-danger">Description</h5>
            <table className="table table-bordered">
              <thead className="table-light">
              </thead>
              <tbody>
              <tr>
           <td>
            <div class="form-group">
       <textarea class="form-control" id="exampleFormControlTextarea1" rows="3">
       {order.description || "N/A"}
       </textarea>
    </div>
             </td>
                </tr>
              </tbody>
            </table>

          </>
        ) : (
          <p>Loading order details...</p>
        )}
      </div>
      <FootComp />
    </div>
  );
};

export default OrderComp;
