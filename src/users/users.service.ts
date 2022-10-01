import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './users.model';

@Injectable()
export class UsersService {

	// Conect our model:
	constructor(@InjectModel(User) private userRepository: typeof User) { }
	
	// We accept dto object with type CreateUserDto
	async addUser(dto: CreateUserDto) { 
		const user = await this.userRepository.create(dto);
		return user;
	}
	
	async getUsers() {
		const users = await this.userRepository.findAll();
		return users;
	}
}
