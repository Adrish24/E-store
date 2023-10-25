import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { Card } from "react-bootstrap";
import { updateCart } from "../../redux/slices/cartSlice";

import { BiMinus, BiPlus } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContex";

const CartItems = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Retrieve cart and cart count from Redux state
  const { cart } = useSelector((state) => state.cart);
  const { count } = useSelector((state) => state.cartCount);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user data from the authentication context
  const { userData } = useAuth();

  useEffect(() => {
    if (!cart) return;

    // Calculate total price, discounted price, and total amount for items in the cart
    const {
      totalAmount: currentAmount,
      totalPrice: currentPrice,
      discountedPrice: totalDiscount,
    } = cart.reduce(
      (acc, item) => {
        if (item.selected) {
          const itemPrice = item.price;
          const discountDecimal = item.discountPercentage / 100;
          const totalDiscount = itemPrice * discountDecimal;
          const sum = itemPrice - totalDiscount;
          const count = Math.floor(item.count);

          acc.totalAmount += sum * count;
          acc.totalPrice += itemPrice * count;
          acc.discountedPrice += totalDiscount * count;
        }
        return acc;
      },
      { totalAmount: 0, totalPrice: 0, discountedPrice: 0 }
    );

    setTotalAmount(currentAmount.toFixed(2));
    setTotalPrice(currentPrice.toFixed(2));
    setDiscountedPrice(totalDiscount.toFixed(2));
  }, [cart]);

  // Function to handle removing an item from the cart
  const handleRemoveItem = async (id) => {
    try {
      const newCart = [...cart];
      const updatedCart = newCart.filter((item) => item.id !== id);
      await updateNewCart(updatedCart);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to decrement the quantity of an item by one
  const handleDecrementByOne = async (id) => {
    try {
      const newCart = [...cart];
      const existingProduct = newCart.find((item) => item.id === id);

      if (existingProduct) {
        const existingProductIndex = newCart.findIndex(
          (item) => item.id === id
        );
        const updatedItem = {
          ...existingProduct,
          count: existingProduct.count - 1,
        };

        newCart[existingProductIndex] = updatedItem;

        const updatedCart = newCart.filter((item) => item.count > 0);

        await updateNewCart(updatedCart);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to handle adding a product to the cart
  const handleIncrementByOne = async (product) => {
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
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to update the cart in Firestore and Redux
  const updateNewCart = async (newCart) => {
    try {
      const userRef = doc(db, "Users", `${userData.uid}`);
      await updateDoc(userRef, {
        cart: newCart,
      });
      await retrieveCart();
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to retrieve and update the cart from Firestore
  const retrieveCart = async () => {
    const userRef = doc(db, "Users", `${userData.uid}`);
    try {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        dispatch(updateCart(data.cart));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to toggle the selection of an item in the cart
  const toggleSelect = async (id) => {
    try {
      const newCart = [...cart];
      const selectedItem = newCart.find((item) => item.id === id);
      if (selectedItem) {
        const selectedItemIndex = newCart.findIndex((item) => item.id === id);
        const updatedItem = {
          ...selectedItem,
          selected: !selectedItem.selected,
        };
        newCart[selectedItemIndex] = updatedItem;
      }
      await updateNewCart(newCart);
    } catch (err) {
      console.log(err.message);
    }
  };
  

  // Function to redirect to the product view page
  const redirectToProductView = (item) => {
    sessionStorage.setItem("productId", JSON.stringify(item.id));
    navigate(`/${item.title}/${item.id}`);
  };

  return (
    <div className="scale-75 sm:scale-100 lg:flex  xl:mx-[200px]">
      <div className="flex-1 px-2">
        <Card.Text className="mb-2 text-lg font-semibold">
          Cart Items: {count}
        </Card.Text>
        {cart &&
          cart.map((item) => (
            <Card key={item.id} className="sm:flex-row mb-2 p-3">
              <Card.Img
                onClick={() => redirectToProductView(item)}
                className="w-16 h-16 self-start border-1 border-gray-300 hover:border-red-600"
                src={item.thumbnail}
              />
              <Card.Body className="pt-0">
                <Card.Title className="overflow-hidden text-ellipsis">
                  {item.title}
                </Card.Title>
                <Card.Text className="mb-2">
                  <span className="text-red-600 text-[20px] mr-2">
                    {item.discountPercentage.toFixed(0)}%
                  </span>
                  <span className="text-[20px] font-semibold">
                    ₹ {item.price}
                  </span>
                </Card.Text>
                <Card.Text className="mb-2">All issue easy returns allowed</Card.Text>
                <div className="flex items-center font-semibold">
                  <Link
                    className="flex items-center hover:text-red-600"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <RxCross2 />
                    <span className="pr-2 border-r-2 border-gray-400">Remove</span>
                  </Link>
                  <div className="flex px-2 relative items-center">
                    {item.selected ? (
                      <span className="mr-2">Selected:</span>
                    ) : (
                      <span className="mr-2">Select:</span>
                    )}
                    <input
                      className="absolute right-[-10px] z-10 opacity-0"
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => toggleSelect(item.id)}
                    />
                    <span className="absolute right-[-10px]">
                      {item.selected ? (
                        <GrCheckboxSelected className="bg-green-400" />
                      ) : (
                        <GrCheckbox />
                      )}
                    </span>
                  </div>
                </div>
              </Card.Body>
              <Card.Body className="flex items-center font-medium">
                <span>Qty</span>
                <div className="flex pt-4 mb-3 drop-shadow-lg ml-2">
                  <button
                    className="bg-red-300 w-6 rounded-l-md p-1"
                    onClick={() => handleDecrementByOne(item.id)}
                  >
                    <BiMinus />
                  </button>
                  <span
                    className="w-10 text-center p-1 border-y border-slate-300"
                    type="textbox"
                  >
                    {item.count}
                  </span>
                  <button
                    className="bg-teal-300 w-6 rounded-r-md p-1"
                    onClick={() => handleIncrementByOne(item)}
                  >
                    <BiPlus />
                  </button>
                </div>
              </Card.Body>
            </Card>
          ))}
      </div>
      <div className="w-[300px] ml-4 pr-2 border-l-2">
        <Card className="p-3 border-0 rounded-none">
          <Card.Title className="font-semibold">Price Details</Card.Title>
          <Card.Body className="pl-0 font-medium text-gray-500">
            <Card.Text className="mb-3 flex justify-between">
              <span>Total Price</span>
              <span>₹ {totalPrice}</span>
            </Card.Text>
            <Card.Text className="mb-3 flex justify-between">
              <span>Discount</span>
              <span className="text-green-500">-₹ {discountedPrice}</span>
            </Card.Text>
            <Card.Footer className="px-2">
              <Card.Text className="flex justify-between font-semibold">
                <span>Order Total</span>
                <span>{totalAmount}</span>
              </Card.Text>
            </Card.Footer>
          </Card.Body>
          <button
            className="
            flex 
            justify-center 
            items-center
            border-2 
            bg-teal-800 
            hover:bg-teal-700
            text-teal-100 
            font-medium 
            rounded-lg 
            p-2 w-full 
            lg:mr-4"
          >
            <span>Continue</span>
          </button>
        </Card>
      </div>
    </div>
  );
};

export default CartItems;
