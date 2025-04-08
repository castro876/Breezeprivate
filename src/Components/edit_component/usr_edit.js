import React, { useEffect, useState } from "react";
import { db } from "../usr_component/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

function Edit() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [trn, setTrn] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered users state
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  // Fetch users from Firestore on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = await getDocs(collection(db, "customers"));
      const usersData = usersCollection.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(usersData);
      setFilteredUsers(usersData); // Initialize filteredUsers
    };

    fetchUsers();
  }, []);

  // Filter users based on search query
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(lowerCaseQuery) ||
        user.lastName.toLowerCase().includes(lowerCaseQuery) ||
        user.email.toLowerCase().includes(lowerCaseQuery) ||
        user.phoneNumber.includes(lowerCaseQuery) ||
        user.trn.toString().includes(lowerCaseQuery)
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  // Validate and sanitize user input
  const validateInput = () => {
    setErrorMessage(""); // Reset error message

    if (!email || !firstName || !lastName || !phoneNumber || !trn) {
      setErrorMessage("All fields are required!");
      return false;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format!");
      return false;
    }

    // Phone number validation (example: allow only digits, max 15 digits)
    const phoneRegex = /^\d{1,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setErrorMessage("Phone number must be up to 15 digits!");
      return false;
    }

    // Sanitize inputs
    setEmail(email.trim());
    setFirstName(firstName.trim());
    setLastName(lastName.trim());
    setPhoneNumber(phoneNumber.trim());
    setTrn(trn.trim());

    return true; // Input is valid
  };

  // Add a new user
  const addUser = async () => {
    if (!validateInput()) return; // Validate inputs

    // Check if the email already exists
    const q = query(collection(db, "customers"), where("email", "==", email));
    const emailExists = await getDocs(q);

    if (!emailExists.empty) {
      setErrorMessage("Email already exists!"); // Set error message
      return; // Exit if email exists
    }

    // Clear error message if email does not exist
    setErrorMessage("");

    await addDoc(collection(db, "customers"), {
      email,
      firstName,
      lastName,
      phoneNumber,
      trn,
    });

    // Fetch updated users
    const usersCollection = await getDocs(collection(db, "customers"));
    const updatedUsers = usersCollection.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers); // Update filteredUsers
    setEmail("");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setTrn("");
  };

  // Update a user
  const updateUser = async () => {
    if (!validateInput()) return; // Validate inputs

    const userDoc = doc(db, "customers", editingId);
    await updateDoc(userDoc, {
      email,
      firstName,
      lastName,
      phoneNumber,
      trn,
    });

    // Fetch updated users
    const usersCollection = await getDocs(collection(db, "customers"));
    const updatedUsers = usersCollection.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers); // Update filteredUsers
    setEmail("");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setTrn("");
    setEditingId(null);
  };

  // Delete a user
  const deleteUser = async (id) => {
    const userDoc = doc(db, "customers", id);
    await deleteDoc(userDoc);

    // Fetch updated users
    const usersCollection = await getDocs(collection(db, "customers"));
    const updatedUsers = usersCollection.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers); // Update filteredUsers
  };

  // Handle edit button click
  const handleEdit = (user) => {
    setEmail(user.email);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setPhoneNumber(user.phoneNumber);
    setTrn(user.trn);
    setEditingId(user.id);
  };

  return (
    <div style={{ padding: "40px 0px 20px 0px" }}>
      <div className="container dBox_1 p-1">
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <div className="text-center">
          <input
            className="me-3 mb-3 p-3 border border-dark"
            style={{ width: "45%" }}
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <input
            className="me-2 p-3 border border-dark"
            style={{ width: "45%" }}
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
          <input
            className="me-3 mb-3 p-3 border border-dark"
            style={{ width: "45%" }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
          />
          <input
            className="me-2 p-3 border border-dark"
            style={{ width: "45%" }}
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
          />
          <input
            className="me-3 p-3 border border-dark"
            style={{ width: "45%" }}
            type="number"
            value={trn}
            onChange={(e) => setTrn(e.target.value)}
            placeholder="TRN"
          />
          <button
            style={{ width: "45.5%" }}
            className="btn-success fw-bold p-3"
            onClick={editingId ? updateUser : addUser}
          >
            {editingId ? "Update User" : "Add User"}
          </button>

          <input
            className="me-3 mt-5 p-3 border border-dark"
            style={{ width: "45%" }}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Customers"
          />
        </div>
        <br />
        <div className="container py-3 scroll-cont">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Action</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email Address</th>
                <th scope="col">Phone Number</th>
                <th scope="col">TRN</th>
              </tr>
            </thead>
            {filteredUsers.map((user) => (
              <tbody key={user.id}>
                <tr>
                  <th scope="row">
                    <i
                      className="fa fa-edit me-3 text-success"
                      onClick={() => handleEdit(user)}
                    ></i>
                    <i
                      className="fa fa-trash text-danger"
                      onClick={() => deleteUser(user.id)}
                    ></i>
                  </th>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.trn}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Edit;
