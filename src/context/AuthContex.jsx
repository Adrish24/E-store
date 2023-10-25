import { createContext, useContext, useEffect, useState } from "react";
import FIREBASE_AUTH, { db } from "../firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { updateCart } from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCount } from "../redux/slices/cartCounterSlice";

// Create a context for managing user authentication
const userContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const { cart } = useSelector((state) => state.cart);

  const [userData, setUserData] = useState();
  const auth = FIREBASE_AUTH;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userData) return 

    const userRef = doc(db, "Users", `${userData.uid}`);
    const retriveCart = async () => {
      try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log(data.cart[0].count);
          dispatch(updateCart(data.cart));
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    retriveCart();
  }, [userData]);


  useEffect(() => {
      if(!cart) return

      const newCartCount = cart.reduce((acc , item) => (acc + Math.floor(item.count)),0)
      dispatch(setCount(newCartCount))

  },[cart])

 

  useEffect(() => {
    // Set up a listener to track user authentication state changes
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserData(currentUser);
      } else {
        setUserData(null);
      }
    });

    // Unsubscribe from the listener to prevent memory leaks
    return () => unSubscribe();
  }, []);

  const createUser = (email, password) => {
    // Create a new user with the provided email and password
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    // Sign in the user with the provided email and password
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    // Sign the user out
    return signOut(auth);
  };

  return (
    <userContext.Provider
      value={{
        userData,
        createUser,
        login,
        logout,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useAuth = () => {
  // Create a custom hook to access the user authentication context
  return useContext(userContext);
};
