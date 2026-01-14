import { Link } from "react-router-dom";
import { useCart } from "./context/CartContext";
import "./app.css";

const Product = (p) => {
  const { cart, addToCart, increaseQty, decreaseQty } = useCart();

  // cart se product dhundo
  const item = cart.find((i) => i._id === p._id);
  const qty = item ? item.quantity : 0;

  return (
    <div className="p_box">
      <Link
        to={`/products/${p._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="p_image">
          <img src={`https://make-order-mk.onrender.com/uploads/${p.image}`} />

          {/* ADD / QTY BUTTON */}
          {qty === 0 ? (
            <button
              className="p_b_add"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(p);
              }}
            >
              ADD
            </button>
          ) : (
            <div
              className="qty_box"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  decreaseQty(p._id);
                }}
              >
                −
              </button>

              <span>{qty}</span>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  increaseQty(p._id);
                }}
              >
                +
              </button>
            </div>
          )}
        </div>

        <div className="p_price">
          <span>₹{p.price}</span>
        </div>

        <div className="p_title">{p.title}</div>
      </Link>
    </div>
  );
};

export default Product;
