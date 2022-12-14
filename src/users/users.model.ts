import {ApiProperty} from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import {Post} from 'src/posts/posts.model';
import {Role} from 'src/roles/roles.model';
import {UserRoles} from 'src/roles/user-roles.model';

interface UserCreationAtr{
	email: string;
	password: string;
}

// For make table in DB we add decorator:
@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAtr> { 

	@ApiProperty({ example: '1', description: 'Uniq id'})
	// We make the fields below in columns:
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@ApiProperty({ example: 'name@gmail.com', description: 'Email address'})
	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false,
	})
	email: string;

	@ApiProperty({ example: '19876', description: 'User password'})
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	password: string;

	@ApiProperty({ example: 'true', description: 'Is banned user or not'})
	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false,
	})
	banned: boolean;

	@ApiProperty({ example: 'Punishment for the villain', description: 'Ban reason'})
	@Column({
		type: DataType.STRING,
		allowNull: true
	})
	banReason: string;

	@BelongsToMany(() => Role, () => UserRoles)
	roles: Role[];

	@HasMany(() => Post)
	posts: Post[];
}