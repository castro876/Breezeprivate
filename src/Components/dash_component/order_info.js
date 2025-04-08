import { useLocation, useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const location = useLocation();
  const { orders = [], deliver = [] } = location.state || {}; // Destructure from location.state or initialize as empty arrays

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // This will take the user back to the previous page
  };


  return (
    <>
      <h1 className="text-center mt-3 mb-5">All Packages</h1>
      <div className="container mb-5">
        <button className="btn btn-danger" onClick={handleGoBack}>
          <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
        </button>
        <table className="table table-striped table-hover">
          <h5 className="text-success">New Orders</h5>
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
            {orders.length > 0 ? (
              orders.map((order) => (
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

      <div className="container mb-5">
        <table className="table table-striped table-hover">
          <h5 className="text-warning">Delivered Orders</h5>
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
            {deliver.length > 0 ? (
              deliver.map((del) => (
                <tr key={del.id}>
                  <th scope="row">{del.trackingNumber}</th>
                  <td>{del.description}</td>
                  <td>{del.receiveDate}</td>
                  <td>{del.status}</td>
                  <td>{del.total}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No deliveries</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderDetails;
