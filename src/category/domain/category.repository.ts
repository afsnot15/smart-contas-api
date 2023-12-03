import { IRepository } from "../../shared/domain/repository/repository-interface";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { Category } from "./cateory.entity";

export interface ICategoryRepository extends IRepository<Category, Uuid>{

    



}