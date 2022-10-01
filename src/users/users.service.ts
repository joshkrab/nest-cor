import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {RolesService} from 'src/roles/roles.service';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './users.model';

@Injectable()
export class UsersService {

	// Conect our model:
	constructor(@InjectModel(User) private userRepository: typeof User,
																private roleService: RolesService) { }
	
	// We accept dto object with type CreateUserDto
	async addUser(dto: CreateUserDto) { 
		const user = await this.userRepository.create(dto);
		// Connect to Roles table:
		const role = await this.roleService.getRoleByValue('USER');
		await user.$set('roles', [role.id])
		return user;
	}
	
	async getUsers() {
		const users = await this.userRepository.findAll({include: {all: true}});
		return users;
	}
}
