import { Request, Response } from "express";
import { ProductService } from "../services/productService";
import { Product } from "../models/Product";

export const getAllProducts = async (_req: Request, res: Response): Promise<void> => {
    try {
        const products: Product[] = await ProductService.getAllProducts();
        res.status(200).json(products);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductManuales = async (_req: Request, res: Response): Promise<void> => {
    try {
        const products: Product[] = await ProductService.getProductManuales();
        res.status(200).json(products);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductElectricos = async (_req: Request, res: Response): Promise<void> => {
    try {
        const products: Product[] = await ProductService.getProductElectricos();
        res.status(200).json(products);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductConstruccion = async (_req: Request, res: Response): Promise<void> => {
    try {
        const products: Product[] = await ProductService.getProductConstruccion();
        res.status(200).json(products);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductOtherMore = async (_req: Request, res: Response): Promise<void> => {
    try {
        const products: Product[] = await ProductService.getProductOtherMore();
        res.status(200).json(products);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    const productId = parseInt(req.params.product_id, 10);
    try {
        if (isNaN(productId)) {
            res.status(400).json({ message: "Invalid product_id" });
            return;
        }

        const product = await ProductService.getProductById(productId);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error: any) {
        console.error('Error in getProductById:', error); // Added for debugging
        res.status(500).json({ message: error.message });
    }
};

export const addProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = req.body;
        const file = req.file;

        if (!file) {
            res.status(400).json({ message: "Product image is required" });
            return;
        }

        // Save the image URL in the product
        product.imageUrl = `/uploads/${file.filename}`;

        const newProduct = await ProductService.addProduct(product, file);
        res.status(201).json(newProduct);
    } catch (error: any) {
        console.error('Error in addProduct:', error);
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product_id: number = parseInt(req.params.product_id);
        const productData: Product = req.body;

        if (isNaN(product_id)) {
            res.status(400).json({ message: "Invalid product_id" });
            return;
        }

        const updatedProduct: Product | null = await ProductService.updateProduct(product_id, productData);
        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product_id: number = parseInt(req.params.product_id);

        if (isNaN(product_id)) {
            res.status(400).json({ message: "Invalid product_id" });
            return;
        }

        const success: boolean = await ProductService.deleteProduct(product_id);
        if (success) {
            res.status(200).json({ message: "Product deleted successfully" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProductLogic = async (req: Request, res: Response): Promise<void> => {
    try {
        const product_id: number = parseInt(req.params.product_id);

        if (isNaN(product_id)) {
            res.status(400).json({ message: "Invalid product_id" });
            return;
        }

        const success: boolean = await ProductService.deleteProductLogic(product_id);
        if (success) {
            res.status(200).json({ message: "Product deleted logically" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getMostSoldProducts = async (_req: Request, res: Response): Promise<void> => {
    try {
        const products = await ProductService.getMostSoldProducts();
        res.status(200).json(products);
    } catch (error: any) {
        res.status(500).json({ message: `Error finding most sold products: ${error.message}` });
    }
};
    