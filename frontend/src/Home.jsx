import Product from "./Product";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ViewCartBtn from "./components/ViewCartBtn";

const Home = () => {

  const API = "https://make-order-mk.onrender.com";
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  return (<div className="container">
    <div className="p_list">
      {products.map((p) => (
        <Product key={p._id} {...p} title={p.title} image={p.image} price={p.price} />
      ))}
    </div>
    
    <ViewCartBtn/>
    </div>);
};

export default Home;
