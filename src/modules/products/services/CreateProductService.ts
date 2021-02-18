import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
    name: string;
    price: number;
    quantity: number;
}

class CreateProductService {
    public async execute({ name, price, quantity }: IRequest) : Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);
        const productExist = await productsRepository.findByName(name);

        if(productExist) {
            throw new AppError('Já existe produto com esse nome', 400);
        } 

        const product = productsRepository.create({
           name,
           price,
           quantity 
        });

        await productsRepository.save(product);

        return product;
    }
}

export default CreateProductService