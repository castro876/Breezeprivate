import { useState } from 'react';
import { auth } from "../usr_component/firebase";  // Firebase config file
import { sendPasswordResetEmail } from 'firebase/auth';  // Import function

const UReset = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ email: '' });
  const [firebaseError, setFirebaseError] = useState(''); // Firebase errors
  const [message, setMessage] = useState(''); // Success message

  const sanitizeInput = (input) => {
    return input.replace(/[<>]/g, '').trim(); 
  };

  const validateForm = async (e) => {
    e.preventDefault();
    let formErrors = { email: '' };
    setFirebaseError(''); // Clear previous Firebase error
    setMessage(''); // Clear previous success message

    // Sanitize input
    const sanitizedEmail = sanitizeInput(email);

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!sanitizedEmail || !emailRegex.test(sanitizedEmail)) {
      formErrors.email = 'Invalid Email.';
    }

    setErrors(formErrors);

    // If no form errors, proceed with Firebase password reset
    if (!formErrors.email) {
      try {
        await sendPasswordResetEmail(auth, sanitizedEmail);  // Use sendPasswordResetEmail from Firebase auth
        setMessage('Password reset link sent to your email. Please check your inbox.');
        setEmail(''); // Clear the email input field after sending
      } catch (error) {
        setFirebaseError(error.message); // Set Firebase error
      }
    }
  };

  return (
    <>
      <div className="py-5">
      <h1 className='fw-bold text-center'>Password Reset</h1>
        <div className="formBox_1">
        <button className="btn btn-danger text-start"><a className="text-white text-decoration-none" href="/">Home</a></button>
          <form className="p-3" style={{ margin: 'auto' }} onSubmit={validateForm}>
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
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
            <button type="submit" className="btn w-100 text-white btn-primary">Send Email</button>
            {firebaseError && <div className="text-danger mt-2">{firebaseError}</div>}
            {message && <div className="text-success mt-2">{message}</div>}
          </form>
        </div>
      </div>
    </>
  );
};

export default UReset;
