import React, { useState } from "react";

const ListProducts = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title || !price || !image) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:5000/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add product");

      await res.json();

      // ✅ clear form
      setTitle("");
      setPrice("");
      setImage(null);
      setPreview(null);
      setSuccess(true);

      e.target.reset();

      // message 3 sec baad hide
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      {success && (
        <p style={{ color: "green", marginBottom: "10px" }}>
          ✅ Your product has been added
        </p>
      )}

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          setImage(file);
          setPreview(URL.createObjectURL(file));
        }}
      />

      {preview && <img src={preview} width="120" alt="preview" />}

      <button>Add Product</button>
    </form>
  );
};

export default ListProducts;
