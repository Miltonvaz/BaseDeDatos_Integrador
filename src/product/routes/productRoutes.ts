import express from "express";
import upload from "../../shared/middlewares/uploadMiddleware";
import { authMiddleware, authorizeRole } from "../../shared/middlewares/auth";
import * as ProductController from "../controllers/productController";

const productsRoutes = express.Router();

productsRoutes.get("/", ProductController.getAllProducts);
productsRoutes.get("/manuales", ProductController.getProductManuales);
productsRoutes.get("/electricos", ProductController.getProductElectricos);
productsRoutes.get("/construccion", ProductController.getProductConstruccion);
productsRoutes.get("/othermore", ProductController.getProductOtherMore);
productsRoutes.get("/:product_id", ProductController.getProductById);
productsRoutes.get('/view/most-sold-products', ProductController.getMostSoldProducts);

productsRoutes.post("/", authMiddleware, upload.single('productImage'), ProductController.addProduct);
productsRoutes.put("/:product_id", ProductController.updateProduct);
productsRoutes.delete("/:product_id", authMiddleware, authorizeRole(['Administrador', 'Empleado']), ProductController.deleteProduct);
productsRoutes.put("/logic/:product_id", authMiddleware, authorizeRole(['Administrador', 'Empleado']), ProductController.deleteProductLogic);

export default productsRoutes;
