import {ApiProperty} from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import {User} from 'src/users/users.model';
import {UserRoles} from './user-roles.model';

interface RoleCreationAtr{
	value: string;
	description: string;
}

// For make table in DB we add decorator:
@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAtr> { 

	@ApiProperty({ example: '1', description: 'Uniq id'})
	// We make the fields below in columns:
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@ApiProperty({ example: 'ADMIN', description: `User's role value`})
	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false,
	})
	value: string;

	@ApiProperty({ example: 'Administrator', description: `User's role description`})
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	description: string;

	@BelongsToMany(() => User, () => UserRoles)
	users: User[];
}