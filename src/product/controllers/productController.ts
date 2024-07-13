import { Request, Response } from "express";
import { productService } from "../services/productService";

export const getAllProduct = async (_req: Request, res: Response) => {
    try {
        const products = await productService.getAllProduct();
        res.status(200).json(products);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getProductrById = async (req: Request, res: Response) => {
    try {
        const product_id = parseInt(req.params.product_id, 10);
        const product = await productService.getProductById(product_id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const newProduct = await productService.addProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProdct = async (req: Request, res: Response) => {
    try {
        const product_id = parseInt(req.params.product_id, 10);
        const updatedProduct = await productService.modifyProduct(product_id, req.body);
        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found or could not be updated.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product_id = parseInt(req.params.product_id, 10);
        const deleted = await productService.deleteProduct(product_id);
        if (deleted) {
            res.status(200).json({ message: 'Product deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Product not found or could not be deleted.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteLogicalProduct = async (req: Request, res: Response) => {
    try {
        const product_id = parseInt(req.params.product_id, 10);
        const success = await productService.deleteProductLogic(product_id);
        if (success) {
            res.status(200).json({ message: 'Product logically deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Product not found or already logically deleted.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
