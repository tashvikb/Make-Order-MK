import {useEffect, useState} from 'react';
import {Routes, Route, Link} from "react-router-dom";
import './app.css'
import 'animate.css';
import ListProduct from './ListProduct'
import Cart from './pages/cart.jsx'   
import Home from './Home'
import Dashboard from "./Dashboard";

const App = () => {

  const [cart, setCart] = useState([]);

  return(
    <div className="container">
      <nav style={{ display: "flex", gap: 20 }}>
        <Link to="/">Home</Link>
        <Link to="/listproducts">List Products</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/cart">Cart</Link>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/listproducts" element={<ListProduct/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </div>
  )
}

export default App
