import { Entity } from "../../shared/domain/entity";
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
    //category.validate();
    category.validate(['name']);
    return category;
  }

  changeName(pName: string): void {
    this.name = pName
    this.validate(['name']);

  }

  changeDescription(pDescription: string): void {
    this.description = pDescription;
   
  }

  validate(fields?: string[]) {
    const validator = CategoryValidatorFactory.create();
    return validator.validate(this.notification, this, fields);
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
