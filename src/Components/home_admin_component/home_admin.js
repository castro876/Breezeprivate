import { db, auth } from "../usr_component/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import UPackage from "../pack_component/usr_package";
import UOrder from "../order_component/usr_order";
import UOptions from "../options_component/usr_option";
import Editing from "../edit_component/usr_edit";
import { signOut } from 'firebase/auth';


const HAdmin = () => {
  const [dboard, setDboard] = useState(true);
  const [cus, setCus] = useState(false);
  const [pack, setPack] = useState(false);
  const [ord, setOrd] = useState(false);
  const [manag, setManag] = useState(false);

  const [orders, setOrders] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [sales, setSales] = useState(0);

  // Fetch orders from Firestore
  const fetchOrders = async () => {
    const querySnapshot = await getDocs(collection(db, "orders"));
    const ordersArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setOrders(ordersArray);

    // Calculate total balance from orders' totals
    const balance = ordersArray.reduce((sum, order) => {
      return sum + (parseFloat(order.total) || 0);
    }, 0);

    setTotalBalance(balance);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const processingOrders = orders.filter(order => order.status === 'Delivered');
    const bal = processingOrders.length;
    setSales(bal);
  }, [orders]);

  // Button handlers for switching views
  const handleDash = () => {
    setDboard(true);
    setCus(false);
    setPack(false);
    setOrd(false);
    setManag(false);
  };

  const handleCustom = () => {
    setDboard(false);
    setCus(true);
    setPack(false);
    setOrd(false);
    setManag(false);
  };

  const handlePack = () => {
    setDboard(false);
    setCus(false);
    setPack(true);
    setOrd(false);
    setManag(false);
  };

  const handleOrder = () => {
    setDboard(false);
    setCus(false);
    setPack(false);
    setOrd(true);
    setManag(false);
  };

  const handleManag = () => {
    setDboard(false);
    setCus(false);
    setPack(false);
    setOrd(false);
    setManag(true);
  };

  const handleLogout = async () => {
    await signOut(auth);
  }

  return (
    <>
      <div className="container-fluid p-0">
        <div className="main_cont" style={{ marginBottom: "90px" }}>
          <nav className="fixed-top dBox_1">
            <button
              className="btn btn-white mx-3 my-4"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithBothOptions"
              aria-controls="offcanvasWithBothOptions"
            >
              <i className="fa fa-bars" style={{ fontSize: "25px" }} aria-hidden="true"></i>
            </button>
            <u style={{ color: "blue" }}>Dashboard</u>
            <Link to="/">
              <img
                src="/images/business_logo.png"
                alt="logo"
                className="img_logo img-fluid d-inline mx-4"
                style={{ width: "25%", float: "right" }}
              />
            </Link>

            <div
              className="can-cont offcanvas offcanvas-start w-50"
              data-bs-scroll="true"
              tabIndex="-1"
              id="offcanvasWithBothOptions"
              aria-labelledby="offcanvasWithBothOptionsLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
                  <Link to="/">
                    <img
                      src="/images/business_logo.png"
                      alt="logo"
                      className="img_logo_two img-fluid d-inline"
                      style={{ width: "75%", float: "left" }}
                    />
                  </Link>
                </h5>
                <button type="button" className="btn-close bg-danger" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body text-center p-0" style={{'backgroundColor':'gold'}}>
                <button
                  type="button"
                  onClick={handleDash}
                  className={`btn ${dboard ? "btn-success" : "btn-light"} w-100 p-3`}
                  style={{ fontSize: "20px" }}
                >
                  <i className="fa fa-address-card-o" aria-hidden="true"></i> Dashboard
                </button>
                <button
                  type="button"
                  onClick={handleCustom}
                  className={`btn ${cus ? "btn-success" : "btn-light"} w-100 p-3`}
                  style={{ fontSize: "20px" }}
                >
                  <i className="fa fa-user-o" aria-hidden="true"></i> Customer
                </button>
                <button
                  type="button"
                  onClick={handlePack}
                  className={`btn ${pack ? "btn-success" : "btn-light"} w-100 p-3`}
                  style={{ fontSize: "20px" }}
                >
                  <i className="fa fa-envelope-open-o" aria-hidden="true"></i> New Order
                </button>
                <button
                  type="button"
                  onClick={handleOrder}
                  className={`btn ${ord ? "btn-success" : "btn-light"} w-100 p-3`}
                  style={{ fontSize: "20px" }}
                >
                  <i className="fa fa-tags" aria-hidden="true"></i> Edit Order
                </button>
                <button
                  type="button"
                  onClick={handleManag}
                  className={`btn ${manag ? "btn-success" : "btn-light"} w-100 p-3`}
                  style={{ fontSize: "20px" }}
                >
                  <i className="fa fa-cogs" aria-hidden="true"></i> Settings
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className={`btn ${manag ? "btn-success" : "btn-light"} w-100 p-3`}
                  style={{ fontSize: "20px" }}
                >
                  <i class="fa fa-lock" aria-hidden="true"></i> Logout
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* Render components based on the selected menu option */}
        {dboard && (
          <div className="col" style={{ height: "100vh" }}>
            <div className="container py-5 px-4">
              <div className="row g-4">
                <div className="col-6">
                  <div className="py-3 border text-center dBox_1">
                    <h3>Sales</h3>
                    <p>{sales}</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="py-3 border text-center dBox_1">
                    <h3>Packages</h3>
                    <p>{orders.length}</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="py-3 border text-center dBox_1">
                    <h3>Payment</h3>
                    <p>0</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="py-3 border text-center dBox_1">
                    <h3>Balance</h3>
                    <p>${totalBalance.toFixed(2)}</p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="container py-5 scroll-cont">
                    <h2>Order List</h2>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Tracking Number</th>
                          <th>Merchant</th>
                          <th>Total</th>
                          <th>Receive Date</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Status</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr className="ad_row" key={order.id}>
                            <td>{order.trackingNumber}</td>
                            <td>{order.merchant}</td>
                            <td>{order.total}</td>
                            <td>{order.receiveDate}</td>
                            <td>{order.name}</td>
                            <td>{order.email}</td>
                            <td>{order.phoneNumber}</td>
                            <td>{order.status}</td>
                            <td>{order.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {cus && <Editing />}
        {pack && <UPackage />}
        {ord && <UOrder />}
        {manag && <UOptions />}
      </div>
    </>
  );
};

export default HAdmin;
