import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import {Role} from 'src/roles/roles.model';
import {UserRoles} from 'src/roles/user-roles.model';
import {User} from 'src/users/users.model';

interface PostCreationAtr{
	title: string;
	content: string;
	userId: number;
	image: string;
}

// For make table in DB we add decorator:
@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAtr> { 

	// We make the fields below in columns:
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false,
	})
	title: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	content: string;

	@Column({
		type: DataType.STRING,
	})
	image: string;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
	})
	userId: number;

	@BelongsTo(() => User)
	author: User;

}