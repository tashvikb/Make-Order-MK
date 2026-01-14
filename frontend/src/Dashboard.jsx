import { useEffect, useState } from "react";

const Dashboard = () => {
    
    const [products, setProducts] = useState([]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure?");
        if (!confirmDelete) return;
      
        try {
          const res = await fetch(`https://make-order-mk.onrender.com/products/${id}`, {
            method: "DELETE",
          });
      
          if (!res.ok) {
            throw new Error("Delete failed");
          }
      
          // frontend se bhi remove karo
          setProducts((prev) =>
            prev.filter((product) => product._id !== id)
          );
      
        } catch (error) {
          console.log(error);
        }
      };
      
    
    useEffect(() => {
        fetch("https://make-order-mk.onrender.com/products")
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.log(err));
    }, []);

    return(
        <div>
            <table>
                <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Delete</th>
                    <th>Edit</th>
                </tr>
                {products.map((p) => (
                     <tr key={p._id}>
                        <td>{p.title}</td>
                        <td>{p.price}</td>
                        <td><img src={`https://make-order-mk.onrender.com/uploads/${p.image}`} style={{width: '100px'}}/></td>
                        <td><button onClick={() => handleDelete(p._id)} >Delete</button></td>
                        <td><button>Edit</button></td>
                     </tr>
                ))}
            </table>
        </div>
    )

}

export default Dashboard;