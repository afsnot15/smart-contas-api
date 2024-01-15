import { Entity } from "../../shared/domain/entity";
import { EntityValidationError } from "../../shared/domain/validators/validation.error";
import { ValueObject } from "../../shared/domain/value-objects";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { CategoryFakeBuilder } from "./category-fake.builder";
import { CategoryValidatorFactory } from "./category.validator";

export type CategoryConstructorProps = {
  categoryId?: Uuid;
  name: string;
  description?: string | null;
  createdAt?: Date;
};

export type CategoryCreateCommand = {
  name: string;
  description?: string | null;
}

export class Category extends Entity {
  categoryId: Uuid;
  name: string;
  description: string | null;
  createdAt: Date;

  constructor(props: CategoryConstructorProps) {
    super();
    this.categoryId = props.categoryId ?? new Uuid();
    this.name = props.name;
    this.description = props.description ?? null;
    this.createdAt = props.createdAt ?? new Date;
  }

  static create(props: CategoryCreateCommand): Category {
    const category = new Category(props);
    Category.validate(category);
    return category;
  }

  changeName(pName: string): void {
    this.name = pName
    Category.validate(this);

  }

  changeDescription(pDescription: string): void {
    this.description = pDescription;
    Category.validate(this);
  }

  static validate(entity: Category) {
    const validator = CategoryValidatorFactory.create();
    const isValid = validator.validate(entity);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }

    return validator.validate(entity);
  }


  static fake() {
    return CategoryFakeBuilder;
  }

  toJSON() {
    return {
      categoryId: this.categoryId.id,
      name: this.name,
      description: this.description,
      createdAt: this.createdAt
    };
  }

  get entity_id(): ValueObject {
    return this.categoryId;
  }
}
