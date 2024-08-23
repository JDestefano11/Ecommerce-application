import { createContext, useState, useEffect } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : {};
  });

  // Add items to cart functionality
  const addToCart = async (itemId, size) => {
    if(!size) {
      toast.error('Select Product Size');
      return;
    }

    setCartItems(prevCartItems => {
      const updatedCartItems = { ...prevCartItems };
      if (updatedCartItems[itemId]) {
        // Check if the item already exists in the cart
        if (updatedCartItems[itemId][size]) {
          // If the specific size of the item exists, increase the quantity by 1
          updatedCartItems[itemId][size] += 1;
        } else {
          // If the size doesn't exist, initialize the quantity for that size to 1
          updatedCartItems[itemId][size] = 1;
        }
      } else {
        // If the item doesn't exist in the cart, initialize it with the selected size and set the quantity to 1
        updatedCartItems[itemId] = { [size]: 1 };
      }
      return updatedCartItems;
    });
  };

  // Update cart item quantity
  const updateCart = (itemId, size, quantity) => {
    setCartItems(prevCartItems => {
      const updatedCartItems = { ...prevCartItems };
      if (updatedCartItems[itemId] && updatedCartItems[itemId][size]) {
        if (quantity > 0) {
          // Update quantity if it's greater than 0
          updatedCartItems[itemId][size] = quantity;
        } else {
          // Remove the size if quantity is 0 or less
          delete updatedCartItems[itemId][size];
          // Remove the entire item if no sizes remain
          if (Object.keys(updatedCartItems[itemId]).length === 0) {
            delete updatedCartItems[itemId];
          }
        }
      }
      return updatedCartItems;
    });
  };

  // Remove item from cart
  const removeCartItem = (itemId, size) => {
    setCartItems(prevCartItems => {
      const updatedCartItems = { ...prevCartItems };
      if (updatedCartItems[itemId] && updatedCartItems[itemId][size]) {
        // Remove the specific size from the item
        delete updatedCartItems[itemId][size];
        // Remove the entire item if no sizes remain
        if (Object.keys(updatedCartItems[itemId]).length === 0) {
          delete updatedCartItems[itemId];
        }
      }
      return updatedCartItems;
    });
  };

  // Update cart count on cart icon
  const getCartCount = () => {
    let totalCount = 0;
    // Iterate through all items in the cart
    Object.values(cartItems).forEach(sizes => {
      // Sum up quantities for all sizes of each item
      Object.values(sizes).forEach(count => {
        totalCount += count;
      });
    });
    return totalCount;
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    updateCart,
    removeCartItem,
    getCartCount
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
