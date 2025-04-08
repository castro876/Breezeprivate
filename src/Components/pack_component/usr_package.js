import React, { useState } from "react";
import { db } from "../usr_component/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; // Import Firestore methods

const UPackage = () => {
  const [formData, setFormData] = useState({
    trackingNumber: "",
    merchant: "",
    total: 0,
    receiveDate: "",
    name: "",
    email: "",
    phoneNumber: "",
    status: "Processing",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [mess, Setmess] = useState(null); 


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
    if (!formData.total || formData.total < 0) newErrors.total = "Valid total amount is required.";
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
    return input.replace(/[<>/]/g, ""); // Remove dangerous characters
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateInput();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Check if the tracking number already exists
    const ordersRef = collection(db, "orders");
    const trackingQuery = query(ordersRef, where("trackingNumber", "==", formData.trackingNumber));
    
    try {
      const querySnapshot = await getDocs(trackingQuery);
      if (!querySnapshot.empty) {
        // If the tracking number already exists, set an error message
        setErrors((prevErrors) => ({
          ...prevErrors,
          trackingNumber: "This tracking number already exists.",
        }));
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



      // Add the sanitized data to Firestore
      await addDoc(collection(db, "orders"), sanitizedData);
      Setmess("Order has been saved successfully!");

      // Optionally reset the form after submission
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
      setErrors({});
    } catch (error) {
      console.error("Error saving document: ", error);
    }
  };

  return (
    <div className="col" style={{ height: "100dvh" }}>
      <div className="container py-5">
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
          <button type="submit" className="btn btn-primary w-100 mt-4">Save Order</button>
          <p className="text-success text-center mt-1">{mess}</p>
        </form>
      </div>
    </div>
  );
};

export default UPackage;
