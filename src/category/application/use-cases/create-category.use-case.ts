import { IUseCase } from "../../../shared/application/use-case.interface";
import { EntityValidationError } from "../../../shared/domain/validators/validation.error";
import { ICategoryRepository } from "../../domain/category.repository";
import { Category } from "../../domain/category.entity";
import { CategoryOutput } from "./common/category-output";

export class CreateCategoryUseCase implements IUseCase<CreateCategoryInput, CreateCategoryOutput> {

    constructor(private readonly categoryRepository: ICategoryRepository) {
    }

    async execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {
        const entity = Category.create(input);


    if (entity.notification.hasErrors()) {
        throw new EntityValidationError(entity.notification.toJSON());
      }

        await this.categoryRepository.insert(entity);

        return {
            id: entity.categoryId.id,
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

export type CreateCategoryOutput = CategoryOutput;

