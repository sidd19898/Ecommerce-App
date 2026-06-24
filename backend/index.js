require("dotenv").config();




const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());


const authRoutes = require("./routes/auth.routes");
const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const wishlistRoutes = require("./routes/wishlist.routes");
const orderRoutes = require("./routes/order.routes");
const userRoutes = require("./routes/user.routes");
const reviewRoutes = require("./routes/review.routes");
const uploadRoutes =
  require("./routes/upload.routes");

app.use(
  "/api/upload",
  uploadRoutes
);
app.use("/api/reviews",reviewRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/wishlist",wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

const errorMiddleware =
  require("./middleware/error.middleware");

app.use(errorMiddleware);
app.get("/", (req, res) => {
    res.json({
        message: "API Running"
    });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});