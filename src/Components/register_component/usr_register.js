import React, { useState } from "react";
import emailjs from 'emailjs-com';
import { Link, useNavigate } from "react-router-dom";
import { db, auth } from "../usr_component/firebase"; // Import Firestore database and Firebase Auth
import { collection, addDoc, getDocs, query, where, setDoc, doc } from "firebase/firestore"; // Import Firestore functions
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // Import auth function to create a user

const Registery = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        trn: '', // TRN field
        agreed: false,
    });
    
    const [emailStatus, setEmailStatus] = useState('');
    const [errors, setErrors] = useState({}); // For storing validation errors
    const [firebaseError, setFirebaseError] = useState(''); // To handle Firebase auth errors
    const [emailMessage, setEmailMessage] = useState(''); // Updated email message state
    const navigate = useNavigate();

    // Generate random alphanumeric string
    function generateRandomString(length) {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 10); // Append random digit (0-9)
        }
        return result;
    }

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Validate form fields
    const validate = () => {
        const newErrors = {};
        if (!formData.firstName || formData.firstName.length < 4) newErrors.firstName = "First name should be at least 4 characters.";
        if (!formData.lastName || formData.lastName.length < 4) newErrors.lastName = "Last name should be at least 4 characters.";
        if (!formData.email) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid.";
        }
        if (!formData.password) newErrors.password = "Password is required.";
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }
        if (!formData.phoneNumber || formData.phoneNumber.length < 10) newErrors.phoneNumber = "Valid phone number is required.";
        if (!formData.trn || formData.trn.length !== 9 || isNaN(formData.trn)) {
            newErrors.trn = "TRN must be 9 digits long."; // TRN validation
        }
        if (!formData.agreed) newErrors.agreed = "You must agree to the terms.";
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

        // Check if email already exists in Firestore
        const customersRef = collection(db, 'customers');
        const q = query(customersRef, where('email', '==', formData.email));

        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                setErrors({ email: "Email already exists." });
                return; // Stop form submission if email exists
            }

            // Register the user with Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            // Generate alphanumeric code
            let alphaNumb = generateRandomString(5);

            // Determine role based on email domain (example logic)
            const role = formData.email.match('ship@breezeexpress.online') ? 'admin' : 'user';

            // Save user details to Firestore with UID as document ID
            await setDoc(doc(db, "customers", user.uid), {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                uid: user.uid, // Use Firebase user ID as document ID
                phoneNumber: formData.phoneNumber,
                trn: formData.trn, // Save TRN
                alpha: alphaNumb,
                role: role // Save the user's role
            });

            setFirebaseError('Registration successful');

            // Optionally reset form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                phoneNumber: '',
                trn: '', // Reset TRN
                agreed: false,
            });
            setErrors({}); // Clear errors

            // Set the email message here to avoid infinite renders
            
            const emailMessageContent = `Welcome ${formData.firstName}
                Thanks for registering with us!
                
                Hi ${formData.firstName}
                
                Below is your shipping address. Please ensure Address line 2 is always entered correctly. We ship packages 4 times per week.
                
                Air Address
                ${formData.firstName} ${formData.lastName}
                Address line 1: 5289 NW 108th Ave
                Address line 2: BEC${alphaNumb}
                City: Sunrise
                State: FL
                Zip code: 33351
                United States
                Rates
                0-21bs-$750
                31bs-$1700
                41bs-$2100
                51bs-$2400
                61bs-$2850
                71bs-$3300
                81bs-$3650
                91bs-$4100
                101bs-$4460
                11-201bs-$6130
                21-301bs-$9630
                31-50-$13388
                501bs and over - 28300
                You can now login to your account at any time. For questions regarding your account, please reply to ship@breezeexpress.online and we will be happy to help.
                Happy Shipping!
                Breeze Express`
            
                setEmailMessage(emailMessageContent);

            // Use Firebase Auth to sign in the user
            await signInWithEmailAndPassword(auth, formData.email, formData.password);

            navigate('/dashboard', {
                state: { mail: formData.email } // Pass mail as state
            });

            // Sending email using EmailJS
            const serviceID = 'service_ltq1a7h';
            const templateID = 'template_yzw6b7b';
            const templateParams = { 
                from_name: 'Breeze Express',
                user_name: formData.firstName,
                to_email: formData.email,
                body: `
                
                Hi ${formData.firstName} ${formData.lastName},
              
                Thanks for registering with us!
                
                Below is your shipping address. Please ensure Address line 2 is always entered correctly. We ship packages 4 times per week.
              
                Air Address:
                
                Address line 1: 5289 NW 108th Ave
                Address line 2: BEC${alphaNumb}
                City: Sunrise
                State: FL
                Zip code: 33351
                United States
              
                Rates:
                0-2 lbs - $750
                3 lbs - $1700
                4 lbs - $2100
                5 lbs - $2400
                6 lbs - $2850
                7 lbs - $3300
                8 lbs - $3650
                9 lbs - $4100
                10 lbs - $4460
                11-20 lbs - $6130
                21-30 lbs - $9630
                31-50 lbs - $13388
                50 lbs and over - $28300
              
                You can now log in to your account at any time. For questions regarding your account, please reply to ship@breezeexpress.online, and we will be happy to help.
                `,
              };
              
            const publicKey = 'w6t4XKwDDWuP1Cjdu';  // Your public key from EmailJS dashboard
        
            emailjs.send(serviceID, templateID, templateParams, publicKey)
                .then((response) => {
                    setEmailStatus('Email sent successfully!');
                })
                .catch((error) => {
                    console.error('Failed to send the email. Error:', error);
                    setEmailStatus(`Failed to send the email. Error: ${error.text || error.message}`);
                });

        } catch (error) {
            console.error("Error adding user: ", error);
            setFirebaseError("Error adding user: ", error.message); // Set Firebase auth error
        }
    };

    return (
        <div className="py-5">
            <h1 className="text-center fw-bold">Register</h1>
            <div className="formBox_1">
                <button className="btn btn-danger">
                    <a className="text-white text-decoration-none" href="/">Home</a>
                </button>
                <form className="p-3" style={{ margin: "auto" }} onSubmit={handleSubmit}>
                    <div className="mb-3" style={{ textAlign: "center" }}>
                        <img src="/images/business_logo.png" alt="logo" className="img-fluid d-inline" style={{ width: "30%", transform: "scale(1.2)", margin: "auto" }} />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="firstName"
                            className="form-control"
                            placeholder="First Name"
                            value={formData.firstName}
                            maxLength={"20"}
                            onChange={handleChange}
                        />
                        {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            placeholder="Last Name"
                            value={formData.lastName}
                            maxLength={"20"}
                            onChange={handleChange}
                        />
                        {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter Email"
                            value={formData.email}
                            maxLength={"35"}
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
                            maxLength={"10"}
                            onChange={handleChange}
                        />
                        {errors.password && <small className="text-danger">{errors.password}</small>}
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            maxLength={"10"}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="phoneNumber"
                            className="form-control"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            maxLength={"11"}
                            onChange={handleChange}
                        />
                        {errors.phoneNumber && <small className="text-danger">{errors.phoneNumber}</small>}
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="trn"
                            className="form-control"
                            placeholder="TRN"
                            value={formData.trn}
                            maxLength={"9"}
                            onChange={handleChange}
                        />
                        {errors.trn && <small className="text-danger">{errors.trn}</small>}
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            name="agreed"
                            className="form-check-input"
                            checked={formData.agreed}
                            onChange={handleChange}
                        />
                        <label className="form-check-label">I agree to the <Link to="/terms">terms and conditions</Link></label>
                        {errors.agreed && <small className="text-danger">{errors.agreed}</small>}
                    </div>
                    <button className="btn btn-primary w-100" type="submit">Register</button>
                    <p className="text-center">Have an account? <Link to={"/signin"}>Login here</Link></p>
                    {firebaseError && <small className="text-danger mt-2 d-block">{firebaseError}</small>}
                    {emailStatus && <small className="text-success mt-2 d-block">{emailStatus}</small>}
                </form>
            </div>
        </div>
    );
};

export default Registery;
