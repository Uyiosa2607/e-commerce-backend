import express from "express";
import {
  addProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
} from "../controllers/productsControllers.js";
import {
  verifyToken,
  verifyTokenAndAdmin,
} from "../middlewares/middlewares.js";

const productRouter = express.Router();

//Route to add new products
productRouter.post("/add", verifyTokenAndAdmin, addProduct);

// Route to get add products from DB
productRouter.get("/all-products", verifyToken, getAllProducts);

productRouter.delete("/delete", verifyTokenAndAdmin, deleteProduct);

productRouter.put("/update/:productId", verifyTokenAndAdmin, updateProduct);

export default productRouter;
