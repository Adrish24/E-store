import { useEffect, useState } from "react";
import { Alert, Card, CardBody, Spinner } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContex";

const Login = ({ handleToggle }) => {
  // States to manage user input and feedback messages
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // State to manage loading state during login
  const [loading, setLoading] = useState(false);

  // Authentication context and routing navigation
  const { login, userData } = useAuth();
  const navigate = useNavigate();

  // Effect to check if the user is already authenticated and navigate to the home page
  useEffect(() => {
    if (userData) navigate("/");
  }, [userData]);

  // Function to handle the login process
  const handleLogin = async () => {
    setLoading(true);
    try {
      if (username) {
        // Attempt to log in with provided credentials
        await login(email, password);
      } else {
        setMessage(
          <Alert className="m-0 p-2 sm:w-[300px]" variant="danger">
            No username provided
          </Alert>
        );
      }
    } catch (error) {
      console.log(error);
      setMessage(
        <Alert className="m-0 p-2 sm:w-[300px]" variant="danger">
          Sign In failed: {error.message}
        </Alert>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-teal-500 p-2">
      {loading ? (
        // Display a loading spinner while processing the login
        <div className="text-teal-900 p-4">
          <Spinner />
        </div>
      ) : (
        <>
          <Card.Title className="pl-4 pt-3 mb-3 font-semibold text-[30px] text-white">
            Log In
          </Card.Title>
          <div className="px-3">{message}</div>
          <CardBody className="flex flex-col">
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
              className="h-[40px] py-2 px-3 sm:w-[300px] rounded-md bg-teal-100 outline-none opacity-80"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </CardBody>
          <CardBody className="flex flex-col pt-0">
            <button
              className="bg-teal-900 hover:bg-teal-800 p-2 rounded-lg font-semibold text-white mb-3"
              onClick={handleLogin}
            >
              Log In
            </button>
            <button
              onClick={handleToggle}
              className="text-teal-900 hover:text-teal-800 p-2 font-semibold"
            >
              Create a new account
            </button>
          </CardBody>
        </>
      )}
    </Card>
  );
};

export default Login;
