import { IUseCase } from "../../shared/application/use-case.interface";
import { ICategoryRepository } from "../domain/category.repository";
import { Category } from "../domain/cateory.entity";

export class CreateCategoryUseCase implements IUseCase<CreateCategoryInput, CreateCategoryOutput> {

    constructor(private readonly categoryRepository: ICategoryRepository) {
    }

    async execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {
        const entity = Category.create(input);

        await this.categoryRepository.insert(entity);

        return {
            categoryId: entity.categoryId.id,
            name: entity.name,
            description: entity.description,
            createdAt: entity.createdAt
        };
    }
}

export type CreateCategoryInput = {
    name: string;
    description: string;
};

export type CreateCategoryOutput = {
    categoryId: string;
    name: string;
    description: string;
    createdAt: Date;
};

