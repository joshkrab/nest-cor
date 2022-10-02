import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {RolesService} from 'src/roles/roles.service';
import {AddRoleDto} from './dto/add-role.dto';
import {BanUserDto} from './dto/ban-user.dto';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './users.model';

@Injectable()
export class UsersService {

	// Conect our model:
	constructor(@InjectModel(User) private userRepository: typeof User,
																private rolesService: RolesService) { }
	
	// We accept dto object with type CreateUserDto
	async addUser(dto: CreateUserDto) { 
		const user = await this.userRepository.create(dto);
		// Connect to Roles table:
		const role = await this.rolesService.getRoleByValue('ADMIN');
		await user.$set('roles', [role.id]);
		user.roles = [role];
		return user;
	}
	
	async getUsers() {
		const users = await this.userRepository.findAll({include: {all: true}});
		return users;
	}

	// "include" for add roles like abow
	async getUserByEmail(email: string) {
		const user = await this.userRepository.findOne({where: {email}, include: {all: true}});
		return user;
	}

	async addRole(dto: AddRoleDto) {
		const user = await this.userRepository.findByPk(dto.userId);
		const role = await this.rolesService.getRoleByValue(dto.value);
		if (user && role) {
			// $add(key, value)
			await user.$add('role', role.id);
			return dto;
		}
		throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
	}
	
	async ban(dto: BanUserDto) {
		const user = await this.userRepository.findByPk(dto.userId);

		if (!user) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}

		user.banned = true;
		user.banReason = dto.banReason;
		await user.save();
		return user;
	}
}
