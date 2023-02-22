import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase/init";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
} from "firebase/firestore";

class EmpDataServices {
  login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("login successfull..");
      })
      .catch((err) => {
        console.log(err.message);
        return err.message;
      });
  };

  register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        console.log(credential);
      })
      .catch((err) => {
        return err.message;
      });
  };

  logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("logged out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  addEmployee = async (user, formData) => {
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
          console.log("Todo stored with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error storing todo: ", error);
        });
    }
  };

  fetchEmpData = () => {
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
  };

  deleteTodo = (id) => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const usersRef = collection(db, "users");
      const userDocRef = doc(usersRef, userId);
      const empsRef = collection(userDocRef, "employees");
      const todoDocRef = doc(empsRef, id);

      deleteDoc(todoDocRef)
        .then(() => {
          console.log("Todo deleted");
          // this.snackbar = true;
          // this.err_message = "Todo deleted...✌";
        })
        .catch((error) => {
          console.error("Error deleting todo: ", error);
        });
    }
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new EmpDataServices();
