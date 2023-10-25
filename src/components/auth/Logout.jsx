import { useDispatch } from "react-redux";

import { updateCart } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { setCount } from "../../redux/slices/cartCounterSlice";
import { useAuth } from "../../context/AuthContex";

const Logout = () => {
  const { logout } = useAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate()

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      // Attempt to log the user out
      await logout();
      dispatch(updateCart([]))
      dispatch(setCount(0))
      navigate('/')
    } catch (error) {
      console.log("Failed to sign out: ", error.message);
    }
  };

  return (
    <a
      className="no-underline px-4 py-2 mb-3 text-red-600 hover:bg-red-200"
      onClick={handleLogout}
    >
      Log out
    </a>
  );
};

export default Logout;
