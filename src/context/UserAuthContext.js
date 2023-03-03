import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/init";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  // Login
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("login successfull..");
      })
      .catch((err) => {
        console.log(err.message);
        return err.message;
      });
  }

  // Register
  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        console.log(credential);
      })
      .catch((err) => {
        return err.message;
      });
  }
  // Logout
  function logOut() {
    console.log("logged out");
    signOut(auth);
    setUser(null);
  }

  // Add Employee
  async function addEmployee(user, formData) {
    console.log("addEmployee called from Context ");

    if (user) {
      const userId = user.uid;
      const usersRef = collection(db, "users");
      const userDocRef = doc(usersRef, userId);
      const empsRef = collection(userDocRef, "employees");
      await addDoc(empsRef, {
        ...formData,
        createdAt: serverTimestamp(),
      })
        .then((docRef) => {
          console.log("employee stored with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error storing employee: ", error);
        });
    }
    return isUpdated;
  }

  // Fetch realtime firestore data
  function fetchEmpData() {
    return new Promise((resolve, reject) => {
      const fetchedData = [];
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userId = user.uid;
          const usersRef = collection(db, "users");
          const userDocRef = doc(usersRef, userId);
          const empsRef = collection(userDocRef, "employees");
          const q = query(empsRef);
          onSnapshot(q, (snapshot) => {
            const emps = [];
            snapshot.forEach((doc) => {
              const emp = {
                id: doc.id,
                ...doc.data(),
              };
              emps.push(emp);
            });
            fetchedData.push(emps);
            resolve(fetchedData); // Resolve Promise with fetchedData
          });
        } else {
          reject("User is not authenticated."); // Reject Promise with an error message
        }
      });
    });
  }

  // Deleted Employee
  function deleteEmployee(id) {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const usersRef = collection(db, "users");
      const userDocRef = doc(usersRef, userId);
      const empsRef = collection(userDocRef, "employees");
      const empDocRef = doc(empsRef, id);

      deleteDoc(empDocRef)
        .then(() => {
          console.log("employee deleted");
        })
        .catch((error) => {
          console.error("Error deleting employee: ", error);
        });
    }
  }

  // Update Employee
  function updateEmployee(id, user, updatedEmployeeData) {
    if (user) {
      const userId = user.uid;

      const usersRef = collection(db, "users");
      const userDocRef = doc(usersRef, userId);
      const empsRef = collection(userDocRef, "employees");
      const empDocRef = doc(empsRef, id);

      updateDoc(empDocRef, {
        ...updatedEmployeeData,
      })
        .then(() => {
          console.log("employee updated successfully");
        })
        .catch((error) => {
          console.error("Error updating employee: ", error);
        });
    }
  }

  //Change Password
  function forgotPassword(email) {
    console.log(email);
    return sendPasswordResetEmail(auth, email)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  //   To check user is logged in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        user,
        register,
        logIn,
        logOut,
        addEmployee,
        fetchEmpData,
        isUpdated,
        setIsUpdated,
        deleteEmployee,
        updateEmployee,
        forgotPassword,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
