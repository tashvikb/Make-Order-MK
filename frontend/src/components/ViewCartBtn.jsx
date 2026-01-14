// src/components/ViewCartBtn.jsx
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ViewCartBtn = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  if (!cart || cart.length === 0) return null; // 👈 cart empty to hide

  const totalQuantity = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <div className="view_cart animate__animated animate__bounceInUp" onClick={() => navigate("/cart")}>
      <div className="vc_images">
        {cart.slice(-3).map((item) => (
          <img
            key={item._id}
            src={`http://make-order-mk.onrender.com/uploads/${item.image}`}
            alt=""
          />
        ))}
      </div>

      <div>
        <span className="vc_title">View Cart</span>
        <span className="vc_items">{totalQuantity} items</span>
      </div>
    </div>
  );
};

export default ViewCartBtn;
