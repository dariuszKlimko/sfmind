import { EntityNotFound } from "@app/exceptions/entity.not.fount";
import { BaseInterfaceRepository } from "@app/interfaces/repository/base.repository.interface";
import { Attributes, WhereOptions } from "sequelize";
import { Model, ModelCtor } from "sequelize-typescript";
import { MakeNullishOptional } from "sequelize/types/utils";

export abstract class BaseRepository<E extends Model> implements BaseInterfaceRepository<E> {
  private readonly model: ModelCtor<E>;

  constructor(model: ModelCtor<E>) {
    this.model = model;
  }

  async findAll(): Promise<E[]> {
    return await this.model.findAll();
  }

  async findOne(id: string): Promise<E> {
    const entity: E = await this.model.findOne({ where: { id } as WhereOptions });
    if (!entity) {
      throw new EntityNotFound("Entity not found");
    }
    return entity;
  }

  async findOpeQuery(condition: Attributes<E>): Promise<E> {
    return await this.model.findOne(condition);
  }

  async createOne(createEntity: MakeNullishOptional<E>): Promise<E> {
    return await this.model.build(createEntity);
  }

  async saveOne(entity: E): Promise<E> {
    return await entity.save();
  }

  async clearAllTable(): Promise<void> {
    return await this.model.truncate();
  }
}
