import { IUseCase } from "../../../../shared/application/use-case.interface";
import { Uuid } from "../../../../shared/domain/value-objects/uuid.vo";
import { ICategoryRepository } from "../../../domain/category.repository";
import { NotFoundError } from "../../../../shared/domain/errors/not-found.error";
import { Category } from "../../../domain/category.entity";
import { CategoryOutput } from "../common/category-output";

export class GetCategoryUseCase implements IUseCase<GetCategoryInput, GetCategoryOutput>{

    constructor(private readonly categoryRepository: ICategoryRepository) { }

    async execute(input: GetCategoryInput): Promise<GetCategoryOutput> {
        const uuid = new Uuid(input.id);
        const category = await this.categoryRepository.findById(uuid);

        if (!category) {
            throw new NotFoundError(input.id, Category);
        }

        return {
            id: category.categoryId.id,
            name: category.name,
            description: category.description,
            createdAt: category.createdAt
        }
    }
}

export type GetCategoryInput = {
    id: string;
}

export type GetCategoryOutput = CategoryOutput;
