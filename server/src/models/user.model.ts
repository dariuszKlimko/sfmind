import {
  Model,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  Table,
  PrimaryKey,
  Default,
  AllowNull,
} from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "user",
  modelName: "User",
})
class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  declare firstName: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  declare lastName: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  declare continent: string;

  @AllowNull(true)
  @Column(DataType.DATE)
  declare birthDate: Date;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}

export default User;
