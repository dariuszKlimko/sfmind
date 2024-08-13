import { Attributes } from "sequelize";
import { Model } from "sequelize-typescript";
import { MakeNullishOptional } from "sequelize/types/utils";

export interface BaseInterfaceRepository<E extends Model> {
  findAll(): Promise<E[]>;
  findOne(id: string): Promise<E>;
  findOpeQuery(condition: Attributes<E>): Promise<E>;
  createOne(createEntity: MakeNullishOptional<E>): Promise<E>;
  saveOne(entity: E): Promise<E>;
  clearAllTable(): Promise<void>;
}
