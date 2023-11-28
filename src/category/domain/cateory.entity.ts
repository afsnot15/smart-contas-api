import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
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

export class Category {
  categoryId: Uuid;
  name: string;
  description: string | null;
  createdAt: Date;

  constructor(props: CategoryConstructorProps) {
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

  static validate(entity: Category){
    const validator = CategoryValidatorFactory.create();
    return validator.validate(entity);
  }

  toJSON() {
    return {
      categoryId: this.categoryId.id,
      description: this.description,
      createAt: this.createdAt
    };
  }
}
