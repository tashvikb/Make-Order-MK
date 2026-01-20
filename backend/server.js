import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import Product from "./models/product.js";
import dotenv from 'dotenv'
dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));


const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

/* POST product */
app.post("/products", upload.single("image"), async (req, res) => {
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    image: req.file.filename,
  });

  await product.save();
  res.json(product);
});

/* GET products */
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.get("/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  await Product.findByIdAndDelete(id);

  res.json({ message: "Product deleted" });
});

app.listen(process.env.PORT || 5000, () =>
  console.log("✅ Backend running on http://localhost:5000")
);