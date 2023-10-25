import { useState } from "react";
import { Alert, Card, CardBody, Spinner } from "react-bootstrap";

import { updateProfile } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContex";

const SignUp = ({ handleToggle }) => {
  // States to manage user input and feedback messages
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // States to manage loading state during sign-up and success message
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  // Authentication context
  const { createUser } = useAuth();

  const { cart } = useSelector((state) => state.cart);
  
  const navigate = useNavigate()

  const setUser = async (user) => {
    // if(!user) return
    // if(!cart) return

    try {
      const userCollectionRef = collection(db, "Users");

      await setDoc(doc(userCollectionRef, `${user.uid}`), {
        displayName: user.displayName,
        email: user.email,
        cart: cart,
      });

      const docSnap = await getDoc(doc(userCollectionRef, `${user.uid}`));
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log(data);
      } else {
        console.log.log("data not found");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  

  // Function to handle the sign-up process
  const handleSignup = async () => {
    setLoading(true);
    try {
      if (confirmPassword === password && username) {
        // Attempt to create a new user with provided credentials
        const response = await createUser(email, password);

        const user = response.user;

        // Update the user's profile with the provided username
        await updateProfile(user, { displayName: username });
        await setUser(user);
        console.log(user, user?.displayName, user?.email);
        setSuccess(true);
        redirect()
      } else {
        if (confirmPassword !== password) {
          setSuccess(false);
          setMessage(
            <Alert className="m-0 p-2 sm:w-[300px]" variant="danger">
              Passwords don&apos;t match
            </Alert>
          );
        }
        if (!username) {
          setSuccess(false);
          setMessage(
            <Alert className="m-0 p-2 sm:w-[300px]" variant="danger">
              No username provided
            </Alert>
          );
        }
      }
    } catch (error) {
      setSuccess(false);
      setMessage(
        <Alert className="m-0 p-2 sm:w-[300px]" variant="danger">
          Sign Up failed: {error.message}
        </Alert>
      );
    } finally {
      setLoading(false);
    }
  };

  const redirect = () => {
    setTimeout(() => {
      navigate('/')
    }, 500)
  }

  return (
    <Card className="bg-teal-500 p-2">
      {loading ? (
        // Display a loading spinner while processing the sign-up
        <div className="text-teal-900 p-4">
          <Spinner />
        </div>
      ) : success ? (
        // Display a success message after successful sign-up
        <Card.Body className="text-center">
          <Alert className="p-2 sm:w-[300px] mb-4" variant="success">
            Sign Up successful
          </Alert>
          <span className="text-teal-900 p-2 rounded-lg font-semibold mb-3 w-full">Rediracting...</span>
        </Card.Body>
      ) : (
        // Display the sign-up form and error messages
        <>
          <Card.Title className="pl-4 pt-3 mb-3 font-semibold text-[30px] text-white">
            Sign Up
          </Card.Title>
          <div className="px-3">{message}</div>
          <CardBody className="flex flex-col">
            {/* Input fields for username, email, password, and confirm password */}
            <input
              className="h-[40px] py-2 px-3 sm:w-[300px] rounded-md mb-3 bg-teal-100 outline-none opacity-80"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="h-[40px] py-2 px-3 sm:w-[300px] rounded-md mb-3 bg-teal-100 outline-none opacity-80"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="h-[40px] py-2 px-3 sm:w-[300px] rounded-md mb-3 bg-teal-100 outline-none opacity-80"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="h-[40px] py-2 px-3 sm:w-[300px] rounded-md mb-3 bg-teal-100 outline-none opacity-80"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </CardBody>
          <CardBody className="flex flex-col pt-0">
            <button
              className="bg-teal-900 hover:bg-teal-800 p-2 rounded-lg font-semibold text-white mb-3"
              onClick={handleSignup}
            >
              Sign Up
            </button>
            <button
              onClick={handleToggle}
              className="text-teal-900 hover:text-teal-800 p-2 font-semibold"
            >
              Account already exists?
            </button>
          </CardBody>
        </>
      )}
    </Card>
  );
};

export default SignUp;
