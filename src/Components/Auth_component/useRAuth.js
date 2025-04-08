import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from "../usr_component/firebase"; // Import your Firebase and Firestore

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Check if currentUser.uid is being correctly retrieved

        try {
          // Fetch user role from Firestore
          const userDocRef = doc(db, 'customers', currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setRole(userData.role);  // Set the user's role
          } else {
            setRole('user');  // Default role if no document is found
          }
        } catch (error) {
          console.error("Error fetching user document from Firestore:", error);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  return { user, role, loading };
};

export default useAuth;
