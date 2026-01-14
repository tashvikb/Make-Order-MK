import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    // localStorage se cart load karo, nahi to empty array
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        // cart change hote hi localStorage me save karo
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        const exist = cart.find(item => item._id === product._id);
        if (exist) {
            setCart(cart.map(item => 
                item._id === product._id 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const increaseQty = (id) => {
        setCart(cart.map(item => 
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const decreaseQty = (id) => {
      setCart((prevCart) =>
        prevCart
          .map(item =>
            item._id === id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter(item => item.quantity > 0) // 👈 0 wale remove
      );
    };
    
    return (
        <CartContext.Provider value={{ cart, addToCart, increaseQty, decreaseQty }}>
            {children}
        </CartContext.Provider>
    );
};
