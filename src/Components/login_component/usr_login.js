import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Import necessary functions
import { app } from "../usr_component/firebase"; // Import your Firebase app

const auth = getAuth(app); // Initialize auth instance

const Ulogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [firebaseError, setFirebaseError] = useState('');
  const navigate = useNavigate();

  const sanitizeInput = (input) => {
    return input.replace(/[<>]/g, '').trim(); 
  };

  const validateForm = async (e) => {
    e.preventDefault();
    let formErrors = { email: '', password: '' };

    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!sanitizedEmail || !emailRegex.test(sanitizedEmail)) {
      formErrors.email = 'Invalid Email.';
    }

    if (!sanitizedPassword || sanitizedPassword.length < 6) {
      formErrors.password = 'Incorrect Login.';
    }

    setErrors(formErrors);

    if (!formErrors.email && !formErrors.password) {
      try {
        // Use Firebase Auth to sign in the user
        await signInWithEmailAndPassword(auth, sanitizedEmail, sanitizedPassword);

        // If the email includes 'admin', navigate to the admin page
      if(sanitizedEmail.includes('ship@breezeexpress.online')) {
        navigate('/admin', {
          state: { mail: sanitizedEmail } // Pass mail as state
        });
      } else {
        // Otherwise, navigate to the dashboard
        navigate('/dashboard', {
          state: { mail: sanitizedEmail } // Pass mail as state
        });
      }
    } catch (error) {
        setFirebaseError('Please Try Again');
      }
    }
  };

  return (
    <>
      <div className="py-5">
        <h1 className='text-center fw-bold'>Login</h1>
        <div className="formBox_1">
        <button className="btn btn-danger"><a className="text-white text-decoration-none" href="/">Home</a></button>
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
                max={"20"}
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
                max={"20"}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <div className="text-danger text-start">{errors.password}</div>}
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign In</button>
            {firebaseError && <div className="text-danger text-center mt-3">{firebaseError}</div>}
            <p className="text-center">Forget your password? <Link to={"/reset"}>Reset Password</Link></p>
            <p className="text-center">Don't have an account? <Link to={"/signup"}>Register here</Link></p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Ulogin;
