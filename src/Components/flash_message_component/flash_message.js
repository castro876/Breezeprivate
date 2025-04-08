import React, { useState } from "react";
import { db } from "../usr_component/firebase";
import { collection, getDocs, query, where, addDoc, updateDoc, doc } from "firebase/firestore"; // Import Firestore functions

const UFlash = () => {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [docId, setDocId] = useState(null); // Store document ID if the message already exists
  const [isUpdateMode, setIsUpdateMode] = useState(false); // Toggle between add and update mode

  // Handle input changes and sanitize input (allow spaces in message)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "email" ? value.trim() : value, // Trim only the email field
    });
  };

  // Validate form data
  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    
    if (!formData.message) {
      newErrors.message = "Message is required.";
    }
    
    return newErrors;
  };

  // Search for an existing message by email
  const handleSearch = async (e) => {
    e.preventDefault();
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, where("email", "==", formData.email));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        setFormData({ email: data.email, message: data.message });
        setDocId(doc.id); // Store document ID for updating
        setIsUpdateMode(true); // Switch to update mode
      } else {
        setErrors({ email: "No message found for this email." });
        setIsUpdateMode(false); // Stay in add mode if no message is found
      }
    } catch (error) {
      console.error("Error searching message:", error);
    }
  };

  // Handle form submission for both adding and updating
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return; // Stop if validation fails

    try {
      if (isUpdateMode && docId) {
        // Update existing message
        const docRef = doc(db, "messages", docId);
        await updateDoc(docRef, {
          message: formData.message,
          updatedAt: new Date(), // Add updated timestamp
        });
      } else {
        // Check if email already exists before adding a new message
        const messagesRef = collection(db, "messages");
        const q = query(messagesRef, where("email", "==", formData.email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          // Add new message
          await addDoc(collection(db, "messages"), {
            email: formData.email,
            message: formData.message,
            createdAt: new Date(), // Add timestamp
          });
        } else {
          setErrors({ email: "Message already exists for this email." });
          return;
        }
      }

      // Reset form after successful submission
      setFormData({ email: '', message: '' });
      setErrors({}); // Clear any previous errors
      setDocId(null); // Clear document ID
      setIsUpdateMode(false); // Reset to add mode after update
    } catch (error) {
      console.error("Error saving or updating message:", error);
    }
  };

  return (
    <div className="py-5">
      <div className="formBox_1">
        <form className="p-3" style={{ margin: 'auto' }} onSubmit={handleSubmit}>
          <div className="mb-3" style={{ textAlign: 'center' }}>
            <img
              src="/images/business_logo.png"
              alt="logo"
              className="img-fluid d-inline"
              style={{ width: '30%', transform: 'scale(1.2)', margin: 'auto' }}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <textarea
              name="message"
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && <div className="text-danger">{errors.message}</div>}
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-2">
            {isUpdateMode ? "Update Message" : "Send Message"}
          </button>
          <button type="button" className="btn btn-secondary w-100" onClick={handleSearch}>
            {isUpdateMode ? "Update Mode: Search Message" : "Search Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UFlash;
