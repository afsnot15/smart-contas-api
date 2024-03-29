
import { CategoryInMemoryRepository } from "../../../../infra/db/in-memory/category-in-memory.repository";
import { CreateCategoryUseCase } from "../create-category.use-case";

describe('CreateCategoryUseCase Unit Test', () => {
    let useCase: CreateCategoryUseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new CreateCategoryUseCase(repository);
    });

    test('should create a category', async () => {
        const spyInsert = jest.spyOn(repository, 'insert');
      
        let output = await useCase.execute({ name: 'test' });
      
        expect(spyInsert).toHaveBeenCalledTimes(1);
        
        expect(output).toStrictEqual({
            id: repository.items[0].categoryId.id,
            name: 'test',
            description: null,
            createdAt: repository.items[0].createdAt,
        });

        output = await useCase.execute({
            name: 'test',
            description: 'some description',
        });

        expect(spyInsert).toHaveBeenCalledTimes(2);

        expect(output).toStrictEqual({
            id: repository.items[1].categoryId.id,
            name: 'test',
            description: 'some description',
            createdAt: repository.items[1].createdAt,
        });
    });
});