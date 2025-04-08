import { useState } from 'react';
import { useNavigate } from "react-router-dom"; // For redirection after login
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase Auth functions
import { app } from "../usr_component/firebase"; // Import Firebase app

const auth = getAuth(app); // Initialize Firebase Auth instance

const Ulogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [firebaseError, setFirebaseError] = useState('');
  const navigate = useNavigate() // React Router useHistory hook for redirection

  const sanitizeInput = (input) => {
    return input.replace(/[<>]/g, '').trim(); 
  };

  const validateForm = async (e) => {
    e.preventDefault();
    let formErrors = { email: '', password: '' };

    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    // Email and Password Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!sanitizedEmail || !emailRegex.test(sanitizedEmail)) {
      formErrors.email = 'Invalid Email.';
    }

    if (!sanitizedPassword || sanitizedPassword.length < 6) {
      formErrors.password = 'Incorrect Login.';
    }

    setErrors(formErrors);

    // If no errors, attempt Firebase Auth sign-in
    if (!formErrors.email && !formErrors.password) {
      try {
        // Firebase sign-in
        await signInWithEmailAndPassword(auth, sanitizedEmail, sanitizedPassword);

        // Redirect to '/admin' route after successful login
        navigate('/admin');
      } catch (error) {
        setFirebaseError('Please Contact Administrator');
      }
    }
  };

  return (
    <>
      <div className="py-5">
        <div className="formBox_1">
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
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <div className="text-danger text-start">{errors.password}</div>}
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign In</button>
            {firebaseError && <div className="text-danger text-center mt-3">{firebaseError}</div>}
            <p className="text-center">Forget your password? Reset Password</p>
            <p className="text-center">Don't have an account? Register here</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Ulogin;
