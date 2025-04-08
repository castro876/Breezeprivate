import React, { useState, useEffect } from "react";
import { db } from "../usr_component/firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";

const UOrder = () => {
  const [formData, setFormData] = useState({
    trackingNumber: "",
    merchant: "",
    total: "",
    receiveDate: "",
    name: "",
    email: "",
    phoneNumber: "",
    status: "Processing",
    description: "",
  });
  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track if editing a document
  const [errors, setErrors] = useState({}); // Track validation errors
  const [mess, Setmess] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(''); 


  // Fetch orders from Firestore
  const fetchOrders = async () => {
    const querySnapshot = await getDocs(collection(db, "orders"));
    const ordersArray = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setOrders(ordersArray);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate input
  const validateInput = () => {
    const newErrors = {};

    if (!formData.trackingNumber) newErrors.trackingNumber = "Tracking number is required.";
    if (!formData.merchant) newErrors.merchant = "Merchant is required.";
    if (!formData.total || isNaN(formData.total)) newErrors.total = "Valid total amount is required.";
    if (!formData.receiveDate) newErrors.receiveDate = "Receive date is required.";
    if (!formData.name) newErrors.name = "Customer name is required.";
    
    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!formData.email || !emailRegex.test(formData.email)) newErrors.email = "Valid email is required.";
    
    // Phone number validation (e.g., 123-456-7890 format)
    const phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Valid phone number is required (e.g., 123-456-7890).";
    }

    return newErrors;
  };

  // Sanitize input
  const sanitizeInput = (input) => {
    return input.replace(/[<>/]/g, ""); // Remove dangerous characters (for example, <, >, /)
  };

  // Check if tracking number exists
  const checkTrackingNumberExists = async (trackingNumber) => {
    const q = query(collection(db, "orders"), where("trackingNumber", "==", trackingNumber));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Return true if tracking number exists
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateInput();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Sanitize formData
    const sanitizedData = {
      trackingNumber: sanitizeInput(formData.trackingNumber),
      merchant: sanitizeInput(formData.merchant),
      total: sanitizeInput(formData.total),
      receiveDate: sanitizeInput(formData.receiveDate),
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      phoneNumber: sanitizeInput(formData.phoneNumber),
      status: formData.status,
      description: sanitizeInput(formData.description),
    };

    try {
      // Check if tracking number exists
      const exists = await checkTrackingNumberExists(sanitizedData.trackingNumber);
      if (exists && !editingId) {
        setErrors({ trackingNumber: "Tracking number already exists." });
        return; // Exit if tracking number exists and we're not editing
      }

      if (editingId) {
        // Update existing order
        const orderRef = doc(db, "orders", editingId);
        await updateDoc(orderRef, sanitizedData);
        Setmess("Order has been updated successfully!");
      } else {
        // Add a new order
        await addDoc(collection(db, "orders"), sanitizedData);
        Setmess("Order has been saved successfully!");
      }

      // Clear form and reset editing
      setFormData({
        trackingNumber: "",
        merchant: "",
        total: "",
        receiveDate: "",
        name: "",
        email: "",
        phoneNumber: "",
        status: "Processing",
        description: "",
      });
      setEditingId(null);
      setErrors({});
      fetchOrders(); // Refresh the list of orders
    } catch (error) {
      console.error("Error saving document: ", error);
    }
  };

  // Handle delete order
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "orders", id));
        Setmess("Order has been deleted!");
        fetchOrders(); // Refresh the list of orders
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
  };

  // Handle edit order (populate form)
  const handleEdit = (order) => {
    setFormData(order);
    setEditingId(order.id); // Set the order ID being edited
  };


  // Filter orders based on search query
  const filteredOrders = orders.filter((order) => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return (
      order.trackingNumber.toLowerCase().includes(lowercasedQuery) ||
      order.merchant.toLowerCase().includes(lowercasedQuery) ||
      order.name.toLowerCase().includes(lowercasedQuery) ||
      order.email.toLowerCase().includes(lowercasedQuery) ||
      order.status.toLowerCase().includes(lowercasedQuery)
    );
  });

  return (
    <>
      <div className="col" style={{ height: "100dvh" }}>
        <div className="container pt-5">
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              <div className="col-sm-8">
                <div className="px-3 border text-center dBox_1">
                  <p className="text-start fw-bold fs-5">Order details</p>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="trackingNumber"
                      className="form-control"
                      placeholder="Enter Tracking Number"
                      value={formData.trackingNumber}
                      onChange={handleChange}
                    />
                    {errors.trackingNumber && <small className="text-danger">{errors.trackingNumber}</small>}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="merchant"
                      className="form-control"
                      placeholder="Enter Merchant eg. (Amazon)"
                      value={formData.merchant}
                      onChange={handleChange}
                    />
                    {errors.merchant && <small className="text-danger">{errors.merchant}</small>}
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      name="total"
                      step="any"
                      className="form-control"
                      placeholder="Enter Total eg. (20.00)"
                      value={formData.total}
                      onChange={handleChange}
                    />
                    {errors.total && <small className="text-danger">{errors.total}</small>}
                  </div>
                  <div className="mb-3">
                    <input
                      type="date"
                      name="receiveDate"
                      className="form-control"
                      value={formData.receiveDate}
                      onChange={handleChange}
                    />
                    {errors.receiveDate && <small className="text-danger">{errors.receiveDate}</small>}
                  </div>
                </div>
              </div>

              <div className="col-sm-4">
                <div className="px-3 border text-center dBox_1">
                  <p className="text-start fw-bold fs-5">Customer info</p>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="name"
                      className="form-control mb-3"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <small className="text-danger">{errors.name}</small>}
                    <input
                      type="email"
                      name="email"
                      className="form-control mb-3"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <small className="text-danger">{errors.email}</small>}
                    <input
                      type="tel"
                      name="phoneNumber"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      title="Phone number must be in the format: 123-456-7890"
                      className="form-control"
                      placeholder="Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                    {errors.phoneNumber && <small className="text-danger">{errors.phoneNumber}</small>}
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="px-5 border text-center dBox_1">
                  <p className="text-start fw-bold fs-5">Status</p>
                  <div className="mb-3">
                    <select
                      className="p-2 form-select"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="px-3 border text-center dBox_1">
                  <p className="text-start fw-bold fs-5">Description</p>
                  <div className="mb-3">
                    <textarea
                      name="description"
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      placeholder="Enter description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-4">
              {editingId ? "Update" : "Save"}
            </button>
            <p className="text-success">{mess}</p>
          </form>
          <div className="text-center">
          <input
            className="me-3 mt-3 p-2 border border-dark"
            style={{ width: "45%" }}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Orders"
          />
          </div>
        </div>
    
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr className="ad_row" key={order.id} onClick={() => handleEdit(order)}>
                  <td>{order.trackingNumber}</td>
                  <td>{order.merchant}</td>
                  <td>{order.total}</td>
                  <td>{order.receiveDate}</td>
                  <td>{order.name}</td>
                  <td>{order.email}</td>
                  <td>{order.phoneNumber}</td>
                  <td>{order.status}</td>
                  <td>{order.description}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering row click
                        handleDelete(order.id);
                      }}
                    >
                      <i
                    className="fa fa-trash-o text-white"
                    aria-hidden="true"
                  ></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UOrder;
