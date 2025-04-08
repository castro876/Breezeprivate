import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore'; 
import { db, auth } from "../usr_component/firebase"; 
import { signOut } from 'firebase/auth';



const Dashboard = ({ message }) => {
  const [usrCollection, setusrCollection] = useState();
  const [ordersCollection, setOrdersCollection] = useState([]); // State for orders
  const [manCollection, setmanCollection] = useState();
  const [manTwoCollection, setmanTwoCollection] = useState();
  const [MessCollection, setMessCollection] = useState([]);
  const [points, setPoints] = useState(null);


  const location = useLocation();
  const { mail } = location.state || {};  // Retrieve mail from location state

   const [sea, setSea] = useState('sea');
   const [air, setAir] = useState('air');

  useEffect(() => {
    const fetchUserDataAndOrders = async () => {
      if (mail) {
        // Query Firebase to get the user data by email
        const customersRef = collection(db, 'customers');
        const q = query(customersRef, where('email', '==', mail));

        try {
          const querySnapshot = await getDocs(q);
          if (querySnapshot.size > 0) {
            querySnapshot.forEach((doc) => {
              setusrCollection(doc.data());
            });
          } else {
          }
         
          // Query Firebase to get the mane data by air
        const customersRefAir = collection(db, 'mane');
        const qA = query(customersRefAir, where('type', '==', air));

          const querySnapshotAir = await getDocs(qA);
          if (querySnapshotAir.size > 0) {
            querySnapshotAir.forEach((doc) => {
              setmanCollection(doc.data());
            });
          } else {
          }

           
          // Query Firebase to get the mane data by air
        const customersRefSea = collection(db, 'mane');
        const qS = query(customersRefSea, where('type', '==', sea));

          const querySnapshotSea = await getDocs(qS);
          if (querySnapshotSea.size > 0) {
            querySnapshotSea.forEach((doc) => {
              setmanTwoCollection(doc.data());
            });
          } else {
          }

               
          // Query Firebase to get the message data by email
        const messageRefSea = collection(db, 'messages');
        const qMess = query(messageRefSea, where('email', '==', mail));

          const querySnapshotMessage = await getDocs(qMess);
          if (querySnapshotMessage.size > 0) {
            querySnapshotMessage.forEach((doc) => {
              setMessCollection(doc.data());
            });
          } else {
          }

          // Now fetch the orders for this user
          const ordersRef = collection(db, 'orders');
          const ordersQuery = query(ordersRef, where('email', '==', mail)); // Assuming orders have an 'email' field

          const ordersSnapshot = await getDocs(ordersQuery);
          const orders = [];
          ordersSnapshot.forEach((doc) => {
            orders.push({ id: doc.id, ...doc.data() }); // Store order data
          });
          setOrdersCollection(orders);
        } catch (error) {
          console.error('Error fetching data from Firebase:', error);
        }
      } else {
      }
    };

    fetchUserDataAndOrders();
  }, [mail]); // Dependency on mail

  const handleLogout = async () => {
    await signOut(auth);
  }
  const deliveredOrders = ordersCollection.filter(order => order.status === 'Delivered');
   
  useEffect(() => {
    if (deliveredOrders.length >= 2) {
        const points = Math.floor(deliveredOrders.length / 2);
        setPoints(points);
    }
}, [deliveredOrders]);
   
const processingOrders = ordersCollection.filter(order => order.status === 'Processing');


const sum = processingOrders.reduce((sum, order) => {
  return sum + (Number(order.total) || 0); // Add the total from each order, defaulting to 0 if total is undefined
}, 0);

const totalSum = sum.toFixed(2) 

  return ( 
    <> 
      <div className="main_cont" style={{}}>
          <nav className="nav_cont" style={{"overflow":"hidden"}}>
            <ul>
                <Link><img src="/images/business_logo.png" alt="logo" className="img-fluid d-inline" style={{"width":"10%","transform":"scale(1.2)"}}/></Link>
              <div className="h_over d-inline fw-bold mt-4" style={{"float":"right","letterSpacing":"4px"}}>
                <a href=""  className="text-decoration-none text-white"><span  style={{"backgroundColor":"#054d92","padding":"90px 20px 90px 20px"}}>Orders</span></a>
                <Link className="text-decoration-none mx-2 text-dark" to="/orders" state={{ orders: ordersCollection, deliver: deliveredOrders }}><span  style={{"padding":"90px 10px 90px 10px"}}>Delivery</span></Link>
                <Link className="text-decoration-none mx-2 text-danger bg-white">Hi, {usrCollection && usrCollection.firstName}</Link>
                 <button className="px-4 py-2" onClick={handleLogout}>Logout</button>
              </div>
            </ul>
          </nav>
        
          

<nav className="mobile_cont d-md-none fixed-top">
<button style={{"backgroundColor":"#054d92"}} className="btn btn-white my-4 ms-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><i className="fa fa-bars" style={{"fontSize":"25px"}} aria-hidden="true"></i>
</button> <span className='fw-bold'></span><p style={{"backgroundColor":"white"}} className="btn text-danger fw-bold pt-4 ps-1" >Hi, {usrCollection && usrCollection.firstName}</p>
<Link><img src="/images/business_logo.png" alt="logo" className="img-fluid d-inline mx-4" style={{"width":"25%", "float":"right"}}/></Link>
<div className="offcanvas offcanvas-start w-50" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel"><Link><img src="/images/business_logo.png" alt="logo" className="img-fluid d-inline" style={{"width":"40%", "float":"left"}}/></Link>
</h5>
    <button type="button" className="btn-close btn-danger" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body text-white" style={{"backgroundColor":"#054d92", "textAlign":"center"}}>
             <div className="w-100 p-3" style={{ fontSize: "25px", "color":"gold" }}>
                Dashboard
              </div>
              <a className='text-decoration-none' href=""><div className="w-100 p-3 text-white " style={{ fontSize: "20px" }}>
              <i class="fa fa-money" aria-hidden="true"></i> Profile
              </div></a>
              <Link 
  className="text-decoration-none" 
  to="/orders"
  state={{ orders: ordersCollection, deliver: deliveredOrders }} // Pass state directly
>
  <div className="w-100 p-3 text-white" style={{ fontSize: "20px" }}>
              <i class="fa fa-cart-arrow-down" aria-hidden="true"></i> Delivery
                 </div>
              </Link>
              <div onClick={handleLogout} className="a_log w-100 p-3 mt-3 text-white" style={{ fontSize: "20px" }}>
              <i class="fa fa-unlock-alt" aria-hidden="true"></i> Logout  
                 </div>
               </div>
</div>
</nav>
        </div>
      
    
      {usrCollection && (
        <div className="row dashb_cont"  style={{"marginTop":"150px"}}>
          <div className="first_col col-8 mb-4 container-fluid bg-white" style={{"backgroundColor":"","width":"100%","padding":"0px 30px 0px 30px"}}>
            <div className="row gy-3">
              <div className="col-12">
                <div className="py-3 border text-center" style={{"backgroundColor":"#ddd","wordWrap": "break-word"}}>
                  <i class="fa fa-envelope text-danger fs-5" aria-hidden="true"></i> <span className='fw-bold'>{MessCollection && MessCollection.message ? MessCollection.message : 'No Messages'}</span>
                </div>
              </div>
              <button class="">
              <div className="col-12">
              <Link 
  className="text-decoration-none" 
  to="/orders"
  state={{ orders: ordersCollection, deliver: deliveredOrders }} // Pass state directly
>
  <div className="p-3 border text-light next_screen" style={{"backgroundColor":"#054d92","wordWrap": "break-word"}}>
    <i className="fa fa-gift" aria-hidden="true"></i> Packages 
    <i className="fa fa-arrow-right float-end mt-1" aria-hidden="true"></i>
  </div>
</Link>


              </div>
              </button>
              <button class="" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
              <div className="col-12">
                <div className="p-3 border text-light next_screen" style={{"backgroundColor":"#054d92","wordWrap": "break-word"}}><i className="fa fa-plane" aria-hidden="true"></i> Address <i class="fa fa-arrow-right float-end mt-1" aria-hidden="true"></i></div>
              </div>
               </button>
             
              <div className="col-6">
                <div className="p-3 border dBox_1">
                  <h5 className="text-start">Packages</h5>
                  <h6 className="text-center">{ordersCollection? ordersCollection.length : 0}</h6>
                </div>
              </div>
              <div className="col-6">
                <div className="p-3 border dBox_1">
                  <h5 className="text-start">Deliveries</h5>
                  <h6 className="text-center">{deliveredOrders? deliveredOrders.length : 0}</h6>
                </div>
              </div>
              <div className="col-6">
                <div className="p-3 border dBox_1">
                  <h5 className="text-start">Messages</h5>
                  <h6 className="text-center">{MessCollection.message? 1 : 0}</h6>
                </div>
              </div>
              <div className="col-6" id='bottom'>
                <div className="p-3 border dBox_1">
                  <h5 className="text-start">Points</h5>
                  <h6 className="text-center">{points? points : 0}</h6>
                </div>
              </div>
              <div className="col-12">
                <div className="p-3 border">
                  <h5 className="text-start">Balance Due</h5><br />
                  <h6 className="text-center">${totalSum} JMD</h6><br />
                  <p className="text-end text-danger fs-6">Note: Due at pickup</p>
                </div>
              </div>

              <div className="p-3 border dBox_1 scroll-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Tracking Number</th>
                      <th scope="col">Description</th>
                      <th scope="col">Receive Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersCollection.length > 0 ? (
                      ordersCollection.map((order) => (
                        <tr key={order.id}>
                          <th scope="row">{order.trackingNumber}</th>
                          <td>{order.description}</td>
                          <td>{order.receiveDate}</td>
                          <td>{order.status}</td>
                          <td>{order.total}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">No orders found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="sec_cont col-4 py-5 px-5 container-fluid" style={{"backgroundColor":"#054d92","wordWrap": "break-word"}}>
            <div>
              <div className='text-white'>
                <h1>Air Shipping Address</h1>
                <p>{manCollection && manCollection.streetAddress} <br />
                 BEC{usrCollection.alpha}<br/>
                 {manCollection && manCollection.city+ ', ' +  manCollection.state} <br />
                 {manTwoCollection && manCollection.zip} 
                 </p>
                <img className="img-fluid" src="/images/plane.jpg" alt="shipping image" />
              </div><br /><br />
              
              <div className='text-white'>
                <h1>Sea Shipping Address</h1>
                <p>{manTwoCollection && manTwoCollection.streetAddress} <br />
                 BEC{manTwoCollection && usrCollection.alpha}<br/>
                 {manCollection && manCollection.city+ ', ' +  manCollection.state} <br />
                 {manTwoCollection && manTwoCollection.zip}</p>
                <img className="img-fluid" src="/images/ship.jpg" alt="shipping image" />
              </div><br /><br />
            </div>
          </div>
          
          <div class="offcanvas offcanvas-end w-75" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasRightLabel">shipping details</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
     <div className='text-dark'>
                <h1>Air Shipping Address</h1>
                <p>{manCollection && manCollection.streetAddress} <br />
                 BEC{manCollection && usrCollection.alpha}<br/>
                 {manCollection && manCollection.city+ ', ' +  manCollection.state} <br />
                 {manCollection && manCollection.zip}</p>
                <img className="img-fluid" src="/images/plane.jpg" alt="shipping image" />
              </div><br /><br />
  </div>
</div>

        </div>
      )}
    </>
  );
}

export default Dashboard;
