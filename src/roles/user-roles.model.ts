import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import {User} from 'src/users/users.model';
import {Role} from './roles.model';

// For make table in DB we add decorator:
@Table({tableName: 'user-roles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> { 

	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	// point to an external table:
	@ForeignKey(()=>Role)
	@Column({	type: DataType.INTEGER })
	roleId: number;

	@ForeignKey(()=>User)
	@Column({	type: DataType.INTEGER })
	userId: number;

}