import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cart, increaseQty, decreaseQty } = useCart();

    if (cart.length === 0) {
        return <h1>Your cart is empty</h1>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>Your Cart</h1>
            {cart.map((item) => (
                <div 
                    key={item._id} 
                    style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "space-between", 
                        marginBottom: "10px", 
                        border: "1px solid #ccc", 
                        padding: "10px",
                        borderRadius: "5px"
                    }}
                >
                    <img 
                        src={`http://localhost:5000/uploads/${item.image}`}
                        alt={item.title} 
                        style={{ width: "80px", height: "80px", objectFit: "cover" }} 
                    />
                    <div style={{ flex: 1, marginLeft: "20px" }}>
                        <h4>{item.title}</h4>
                        <p>Price: ₹{item.price}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <button onClick={() => decreaseQty(item._id)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => increaseQty(item._id)}>+</button>
                        </div>
                    </div>
                    <p>Total: ₹{item.price * item.quantity}</p>
                </div>
            ))}
            <Link to="/checkout">
                <button style={{ marginTop: "20px", padding: "10px 20px" }}>
                    Go to Checkout
                </button>
            </Link>
        </div>
    );
}

export default Cart;
