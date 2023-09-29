import { AppDataSource } from "../data-source";
import { Product } from "../entities/product.entity";

export class productService {
       static async createProduct(user, name, description, amount) {
        try {  
            const productRepository = AppDataSource.getRepository(Product);
            const newProduct = new Product();
            newProduct.name = name; // Set the product details
            newProduct.user = user; 
            newProduct.description= description 
            newProduct.amount = amount;      
            await productRepository.save(newProduct);
          } catch (error) {
            //throw new Error("Error creating product");
            throw error
          }
       } 
}