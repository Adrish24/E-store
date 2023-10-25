/* eslint-disable react/prop-types */

import { useState } from "react";
import { useEffect } from "react";
import {
  AiOutlineShoppingCart,
  AiOutlineShopping,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import image_placeholder from "../../assets/image_placeholder.png";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";

import { updateCart } from "../../redux/slices/cartSlice";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContex";

const Preview = ({ data }) => {
  // State to manage the currently displayed image
  const [currentIndex, setCurrentIndex] = useState(0);

  // State to manage sorted images for display
  const [sortedImages, setSortedImages] = useState(null);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redux selectors for accessing cart and cart count
  const { cart } = useSelector((state) => state.cart);

  // Authentication context for accessing user data
  const { userData } = useAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Sort and initialize images for display
    const sortImages = () => {
      let tempImgs = [...data.images];

      // Reverse the order of images
      for (let i = 0; i <= tempImgs.length - 1; i++) {
        let j = tempImgs.length - 1;
        let image = tempImgs[i];
        tempImgs[i] = tempImgs[j];
        tempImgs[j] = image;
      }

      // Initialize images with selected state
      tempImgs = tempImgs.map((image, index) => ({
        src: image,
        selected: index === 0,
      }));

      setSortedImages(tempImgs);
    };
    sortImages();
  }, []);

  const addedToCartMessageTimer = () => {
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  };

  // Handle selecting an image
  const imageSelect = (index) => {
    setCurrentIndex(index);
    setSortedImages((prevImages) => {
      const selectedImage = prevImages.map((image, i) => ({
        ...image,
        selected: i === index,
      }));
      return selectedImage;
    });
  };

  // Handle image loading error by replacing it with a placeholder
  const handleImageError = (e) => {
    e.target.src = image_placeholder;
  };

  // Function to handle adding a product to the cart
  const handleAddtoCart = async (product) => {
    if(!userData) {
      navigate('/auth')
    } 
    setLoading(true);
    try {
      const newCart = [...cart];
      const existingProduct = newCart.find((item) => item.id === product.id);
      if (!existingProduct) {
        newCart.push({ ...product, count: 1, selected: true });
      }

      if (existingProduct) {
        const existingProductIndex = newCart.findIndex(
          (item) => item.id === product.id
        );
        const updatedItem = {
          ...existingProduct,
          count: existingProduct.count + 1,
        };
        newCart[existingProductIndex] = updatedItem;
      }
      await updateNewCart(newCart);
      setSuccess(true);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
      addedToCartMessageTimer()
    }
  };

  // Function to update the user's cart data in Firestore
  const updateNewCart = async (newCart) => {
    try {
      const userRef = doc(db, "Users", `${userData.uid}`);
      await updateDoc(userRef, {
        cart: newCart,
      });
      await retriveCart();
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to retrieve and update the cart from Firestore
  const retriveCart = async () => {
    const userRef = doc(db, "Users", `${userData.uid}`);
    try {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log(data);
        dispatch(updateCart(data.cart));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex w-full lg:px-2 mb-4 relative">
      <div>
        {sortedImages &&
          sortedImages.map((image, i) => (
            <div
              className={`
            lg:p-2 p-1 mb-2 
            border-2 
            ${image.selected ? "border-red-700" : "border-gray-300"}
            hover:border-red-700 
            rounded-md 
            h-[40px] w-[40px]
            md:h-[60px] md:w-[60px]
            cursor-pointer
            `}
              key={image.src}
              onClick={() => imageSelect(i)}
            >
              <img
                onError={handleImageError}
                className="
                object-cotain
                h-full w-full
                lg:rounded-md "
                src={image.src}
              />
            </div>
          ))}
      </div>
      <div className="flex-1 w-full lg:ml-4 ml-2">
        <div className="p-2 mb-3 h-[250px]  md:h-[450px] border-2 border-gray-300 rounded-md">
          <img
            onError={handleImageError}
            className="object-contain h-full w-full rounded-md"
            src={sortedImages && sortedImages[currentIndex].src}
          />
        </div>
        <div className="flex flex-col md:flex-row md:p-3 p-2 gap-2">
          {loading ? (
            <button
              className="
            flex 
            justify-center 
            items-center
            border-2 
            border-teal-800 
            text-teal-800 
            font-medium 
            rounded-lg 
            p-2 w-full 
            lg:mr-4"
            >
              <span>Adding...</span>
            </button>
          ) : (
            <button
              onClick={() => handleAddtoCart(data)}
              className="
            flex 
            justify-center 
            items-center
            border-2 
            border-teal-800 
            text-teal-800 
            font-medium 
            rounded-lg 
            p-2 w-full 
            lg:mr-4"
            >
              <AiOutlineShoppingCart className="mr-2 ml-1" />
              <span>Add to Cart</span>
            </button>
          )}
          <button
            className="
            flex
            justify-center 
            items-center
            bg-teal-900 
            rounded-lg 
            text-white 
            font-semibold 
            p-2 w-full"
          >
            <AiOutlineShopping className="mr-2 ml-1" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
      {success ? (
        <Alert
          className="
          m-0 p-2 
          sm:w-[200px] 
          fixed
          lg:bottom-8
          lg:left-4
          flex 
          items-center 
          border-2 
          border-green-900
          z-40
          "
          variant="success"
        >
          <AiOutlineCheckCircle className="text-[20px] mr-2" /> Item Added
        </Alert>
      ) : null}
    </div>
  );
};

export default Preview;
