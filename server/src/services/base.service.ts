import { BaseInterfaceRepository } from "@app/interfaces/repository/base.repository.interface";
import { BaseServiceInterface } from "@app/interfaces/services/base.service.interface";
import { Attributes } from "sequelize";
import { Model } from "sequelize-typescript";
import { MakeNullishOptional } from "sequelize/types/utils";

export abstract class BaseService<E extends Model> implements BaseServiceInterface<E> {
  private readonly repository: BaseInterfaceRepository<E>;

  constructor(repository: BaseInterfaceRepository<E>) {
    this.repository = repository;
  }

  async findAll(): Promise<E[]> {
    return await this.repository.findAll();
  }

  async findOne(id: string): Promise<E> {
    return await this.repository.findOne(id);
  }

  async findOpeQuery(condition: Attributes<E>): Promise<E> {
    return await this.repository.findOpeQuery(condition);
  }

  async createOne(createEntity: MakeNullishOptional<E>): Promise<E> {
    return await this.repository.createOne(createEntity);
  }

  async saveOne(entity: E): Promise<E> {
    return await this.repository.saveOne(entity);
  }

  async clearAllTable(): Promise<void> {
    return await this.repository.clearAllTable();
  }
}
