import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, addDoc, updateDoc, doc } from 'firebase/firestore'; 
import { db } from "../usr_component/firebase"; 

const UShipping = () => {
  const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", 
    "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", 
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", 
    "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", 
    "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", 
    "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

  const initialFormState = {
    streetAddress: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
  };

  const [airFormData, setAirFormData] = useState(initialFormState);
  const [seaFormData, setSeaFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [existingAddresses, setExistingAddresses] = useState([]);
  const [notification, setNotification] = useState(''); // State for notification message

  // Function to sanitize and trim inputs
  const sanitizeInput = (value) => {
    return value.replace(/[<>]/g, '');  // Only removes '<' and '>' to prevent HTML injection
  };

  // Function to handle form input changes
  const handleChange = (e, formType) => {
    const { id, value } = e.target;
    if (formType === "air") {
      setAirFormData({
        ...airFormData,
        [id]: sanitizeInput(value),
      });
    } else {
      setSeaFormData({
        ...seaFormData,
        [id]: sanitizeInput(value),
      });
    }
  };

  // Function to validate the form before submission
  const validateForm = (formData) => {
    const newErrors = {};

    if (!formData.streetAddress) newErrors.streetAddress = 'Street Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zip || !/^\d{5}(-\d{4})?$/.test(formData.zip)) newErrors.zip = 'Invalid Zip Code';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Load existing addresses from Firestore on mount
  useEffect(() => {
    const loadAddresses = async () => {
      const addressesRef = collection(db, 'mane');
      const q = query(addressesRef);
      const querySnapshot = await getDocs(q);
      const addresses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setExistingAddresses(addresses);
      
      // Pre-fill form data if addresses exist
      if (addresses.length > 0) {
        const airAddress = addresses.find(addr => addr.type === 'air');
        const seaAddress = addresses.find(addr => addr.type === 'sea');
        if (airAddress) setAirFormData(airAddress);
        if (seaAddress) setSeaFormData(seaAddress);
      }
    };
    loadAddresses();
  }, []);

  // Handle form submission
  const handleSubmit = async (e, formData, formType) => {
    e.preventDefault();
    if (validateForm(formData)) {
      try {
        const existingAir = existingAddresses.find(addr => addr.type === 'air');
        const existingSea = existingAddresses.find(addr => addr.type === 'sea');

        if (formType === "air") {
          if (existingAir) {
            // Update existing air address
            await updateDoc(doc(db, 'mane', existingAir.id), { ...formData, type: 'air' });
            setNotification('Air address updated successfully!'); // Set notification message
          } else if (existingAddresses.length < 2) {
            // Add new air address
            await addDoc(collection(db, 'mane'), { ...formData, type: 'air' });
            setNotification('Air address saved successfully!'); // Set notification message
          }
        } else {
          if (existingSea) {
            // Update existing sea address
            await updateDoc(doc(db, 'mane', existingSea.id), { ...formData, type: 'sea' });
            setNotification('Sea address updated successfully!'); // Set notification message
          } else if (existingAddresses.length < 2) {
            // Add new sea address
            await addDoc(collection(db, 'mane'), { ...formData, type: 'sea' });
            setNotification('Sea address saved successfully!'); // Set notification message
          }
        }

        // Reload addresses after submission
        const addressesRef = collection(db, 'mane');
        const q = query(addressesRef);
        const querySnapshot = await getDocs(q);
        const updatedAddresses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setExistingAddresses(updatedAddresses);
        
        // Clear notification after 3 seconds
        setTimeout(() => {
          setNotification('');
        }, 3000);

      } catch (error) {
        console.error("Error saving address: ", error);
        setNotification('Error saving address. Please try again.'); // Set error notification message
      }
    } else {
    }
  };

  return (
    <>
    <div className="container py-5" style={{marginTop:"10px"}}>
      {/* Notification message */}
      {notification && <div className="alert alert-info">{notification}</div>}
      
      <div className="row mb-5">
        {/* Air Shipping Address Form */}
        <div className='col-sm-6 dBox_1'>
          <h2>Air Shipping Address</h2>
          <div className=''>
            <form onSubmit={(e) => handleSubmit(e, airFormData, "air")}>
              <div className="mb-3">
                <label htmlFor="streetAddress" className="form-label">Street Address</label>
                <input
                  type="text"
                  className={`form-control ${errors.streetAddress ? 'is-invalid' : ''}`}
                  id="streetAddress"
                  placeholder="1234 Main St"
                  value={airFormData.streetAddress}
                  onChange={(e) => handleChange(e, "air")}
                />
                {errors.streetAddress && <div className="invalid-feedback">{errors.streetAddress}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="address2" className="form-label">Address 2 (optional)</label>
                <input
                  type="text"
                  className="form-control"
                  id="address2"
                  placeholder="Apartment, studio, or floor"
                  value={airFormData.address2}
                  onChange={(e) => handleChange(e, "air")}
                />
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="city" className="form-label">City</label>
                  <input
                    type="text"
                    className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                    id="city"
                    placeholder="City"
                    value={airFormData.city}
                    onChange={(e) => handleChange(e, "air")}
                  />
                  {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="state" className="form-label">State</label>
                  <select
                    className={`form-select ${errors.state ? 'is-invalid' : ''}`}
                    id="state"
                    value={airFormData.state}
                    onChange={(e) => handleChange(e, "air")}
                  >
                    <option selected disabled value="">Choose...</option>
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="zip" className="form-label">Zip</label>
                  <input
                    type="text"
                    className={`form-control ${errors.zip ? 'is-invalid' : ''}`}
                    id="zip"
                    placeholder="Zip"
                    value={airFormData.zip}
                    onChange={(e) => handleChange(e, "air")}
                  />
                  {errors.zip && <div className="invalid-feedback">{errors.zip}</div>}
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100">Save</button>
            </form>
          </div>
        </div>
    

        {/* Sea Shipping Address Form */}
        <div className='col-sm-6 dBox_1'>
          <h2>Sea Shipping Address</h2>
          <div className=''>
            <form onSubmit={(e) => handleSubmit(e, seaFormData, "sea")}>
              <div className="mb-3">
                <label htmlFor="streetAddress" className="form-label">Street Address</label>
                <input
                  type="text"
                  className={`form-control ${errors.streetAddress ? 'is-invalid' : ''}`}
                  id="streetAddress"
                  placeholder="1234 Main St"
                  value={seaFormData.streetAddress}
                  onChange={(e) => handleChange(e, "sea")}
                />
                {errors.streetAddress && <div className="invalid-feedback">{errors.streetAddress}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="address2" className="form-label">Address 2 (optional)</label>
                <input
                  type="text"
                  className="form-control"
                  id="address2"
                  placeholder="Apartment, studio, or floor"
                  value={seaFormData.address2}
                  onChange={(e) => handleChange(e, "sea")}
                />
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="city" className="form-label">City</label>
                  <input
                    type="text"
                    className={`form-control ${errors.city ? 'is-invalid' : ''} w-75`}
                    id="city"
                    placeholder="City"
                    value={seaFormData.city}
                    onChange={(e) => handleChange(e, "sea")}
                  />
                  {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="state" className="form-label">State</label>
                  <select
                    className={`form-select ${errors.state ? 'is-invalid' : ''}`}
                    id="state"
                    value={seaFormData.state}
                    onChange={(e) => handleChange(e, "sea")}
                  >
                    <option selected disabled value="">Choose...</option>
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="zip" className="form-label">Zip</label>
                  <input
                    type="text"
                    className={`form-control ${errors.zip ? 'is-invalid' : ''}`}
                    id="zip"
                    placeholder="Zip"
                    value={seaFormData.zip}
                    onChange={(e) => handleChange(e, "sea")}
                  />
                  {errors.zip && <div className="invalid-feedback">{errors.zip}</div>}
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default UShipping;
