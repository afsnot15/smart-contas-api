import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../cateory.entity";

describe('Category Unit Tests', () => {
    let validadeSpy: any;

    beforeEach(() => {
        validadeSpy = jest.spyOn(Category, 'validate');
    });

    describe('constructor', () => {

        test('should create a category with a name and description', () => {
            let category = new Category({ name: 'Test Category' });

            expect(category.categoryId).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Test Category');
            expect(category.description).toBeNull();
            expect(category.createdAt).toBeInstanceOf(Date);       
        });

        test('should create a category with a name, description and createdAt', () => {
            const createdAt = new Date();
            const category = new Category({ name: 'Test Category', description: 'Test Description', createdAt });

            expect(category.categoryId).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Test Category');
            expect(category.description).toBe('Test Description');
            expect(category.createdAt).toBe(createdAt);
        });
    });

    describe('category_id field', () => {
        const arrange = [{ categoryId: null }, { categoryId: undefined }, { categoryId: new Uuid() }];
        test.each(arrange)('id = %j', ({ categoryId }) => {
            const category = new Category({
                name: 'Test Category', categoryId: categoryId as any,
            });

            expect(category.categoryId).toBeInstanceOf(Uuid);
            if (categoryId instanceof Uuid) {
                expect(category.categoryId).toBe(categoryId);
            }
        });
    });


    test('changeName should change the name of the category', () => {
        const category = new Category({ name: 'Test Category' });
        category.changeName('New Test Category');

        expect(category.name).toBe('New Test Category');
        expect(validadeSpy).toHaveBeenCalledTimes(1);
    });

    test('changeDescription should change the description of the category', () => {
        const category = new Category({ name: 'Test Category' });
        category.changeDescription('New Test Description');

        expect(category.description).toBe('New Test Description');
        expect(validadeSpy).toHaveBeenCalledTimes(1);
    });

    test('create should create a new category', () => {
        const category = Category.create({ name: 'Test Category' });

        expect(category.categoryId).toBeInstanceOf(Uuid);
        expect(category.name).toBe('Test Category');
        expect(category.description).toBeNull();
        expect(category.createdAt).toBeInstanceOf(Date);
        expect(validadeSpy).toHaveBeenCalledTimes(1);
    });
});