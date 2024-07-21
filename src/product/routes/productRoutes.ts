import express from "express";
import { ProductController } from "../controllers/productController";
import upload from "../../shared/middlewares/uploadMiddleware";
import { authMiddleware } from "../../shared/middlewares/auth";
import { authorizeRole } from "../../shared/middlewares/auth";
const productsRoutes = express.Router();

productsRoutes.get("/", ProductController.getAllProducts);
productsRoutes.get("/manuales", ProductController.getProductManuales);
productsRoutes.get("/electricos", ProductController.getProductElectricos);
productsRoutes.get("/construccion", ProductController.getProductConstruccion);
productsRoutes.get("/othermore", ProductController.getProductOtherMore);
productsRoutes.get("/:product_id", ProductController.getProductById);
productsRoutes.post("/",  upload.single('productImage'), ProductController.addProduct);
productsRoutes.put("/:product_id",authorizeRole(['Administrador','Empleado']),authMiddleware,  ProductController.updateProduct);
productsRoutes.delete("/:product_id",authorizeRole(['Administrador','Empleado']),authMiddleware,  ProductController.deleteProduct);
productsRoutes.put("/:product_id", authorizeRole(['Administrador','Empleado']),authMiddleware, ProductController.deleteProductLogic);

export default productsRoutes;
