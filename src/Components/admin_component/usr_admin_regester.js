import React, { useState } from "react";
import { auth } from "../usr_component/firebase"; // Import Firebase Auth
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Auth function

const UsrLoginAdmin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({}); // For validation errors
  const [firebaseError, setFirebaseError] = useState(''); // Firebase auth errors

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Register the user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Optionally reset form after successful registration
      setFormData({
        email: '',
        password: '',
      });
      setErrors({}); // Clear any errors

    } catch (error) {
      console.error("Error registering user: ", error);
      setFirebaseError(error.message); // Set Firebase auth error
    }
  };

  return (
    <div className="py-5">
      <div className="formBox_1">
        <form className="p-3" style={{ margin: "auto" }} onSubmit={handleSubmit}>
          <div className="mb-3" style={{ textAlign: "center" }}>
            <img src="/images/business_logo.png" alt="logo" className="img-fluid d-inline" style={{ width: "30%", transform: "scale(1.2)", margin: "auto" }} />
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
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
          {firebaseError && <p className="text-danger mt-2">{firebaseError}</p>}
        </form>
      </div>
    </div>
  );
};

export default UsrLoginAdmin;
