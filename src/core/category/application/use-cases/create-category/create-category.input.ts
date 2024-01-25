import { IsNotEmpty, IsOptional, IsString, validateSync } from "class-validator";

export type CreateCateogoryConstructorProps = {
    name: string;
    description?: string | null;
};

export class CreateCategoryInput {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    description?: string | null;

    constructor(props: CreateCateogoryConstructorProps) {
        if (!props) return;

        this.name = props.name;
        this.description = props.description;
    }
}

export class ValidadeCreateCategoryInput {
    static validate(input: CreateCategoryInput) {
        return validateSync(input);
    }
}