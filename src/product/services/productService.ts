import { ProductRepository } from "../repositories/ProductRepository";
import { Product } from "../models/Product";
import { DateUtils } from "../../shared/utils/DateUtils";

export class ProductService {

    public static async getAllProducts(): Promise<Product[]> {
        try {
            return await ProductRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error retrieving products: ${error.message}`);
        }
    }

    public static async getProductManuales(): Promise<Product[]> {
        try {
            return await ProductRepository.findManuales();
        } catch (error: any) {
            throw new Error(`Error finding product: ${error.message}`);
        }
    }

    public static async getProductElectricos(): Promise<Product[]> {
        try {
            return await ProductRepository.findElectricos();
        } catch (error: any) {
            throw new Error(`Error finding product: ${error.message}`);
        }
    }

    public static async getProductConstruccion(): Promise<Product[]> {
        try {
            return await ProductRepository.findConstruccion();
        } catch (error: any) {
            throw new Error(`Error finding product: ${error.message}`);
        }
    }

    public static async getProductOtherMore(): Promise<Product[]> {
        try {
            return await ProductRepository.findOtherMore();
        } catch (error: any) {
            throw new Error(`Error finding product: ${error.message}`);
        }
    }

    public static async getProductById(product_id: number): Promise<Product | null> {
        try {
            return await ProductRepository.findById(product_id);
        } catch (error: any) {
            throw new Error(`Error finding product: ${error.message}`);
        }
    }
    public static async addProduct(product: Product, file: Express.Multer.File): Promise<Product> {
        try {
            const urlProject = process.env.URL || 'https://ferreteriaapi.integrador.xyz'; 
    
            product.url = `${urlProject}/uploads/${file.filename}`;
            product.created_at = DateUtils.formatDate(new Date());
            product.updated_at = DateUtils.formatDate(new Date());
            product.created_by = 'Usuario que crea el registro';
            product.updated_by = 'Usuario que actualizó por última vez el registro';    
    
            return await ProductRepository.createProduct(product);
        } catch (error: any) {
            throw new Error(`Error creating product: ${error.message}`);
        }
    }
    
    
    public static async updateProduct(product_id: number, productData: Product): Promise<Product | null> {
        try {
            const currentDate =DateUtils.formatDate(new Date());
            productData.updated_at = currentDate;
            return await ProductRepository.updateProduct(product_id, productData);
        } catch (error: any) {
            throw new Error(`Error updating product: ${error.message}`);
        }
    }

    public static async deleteProduct(product_id: number): Promise<boolean> {
        try {
            return await ProductRepository.deleteProduct(product_id);
        } catch (error: any) {
            throw new Error(`Error deleting product: ${error.message}`);
        }
    }

    public static async deleteProductLogic(product_id: number): Promise<boolean> {
        try {
            return await ProductRepository.deleteProductLogic(product_id);
        } catch (error: any) {
            throw new Error(`Error deleting product: ${error.message}`);
        }
    }
}
