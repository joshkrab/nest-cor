import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from 'src/auth/jwt-auth.guard';
import {RolesGuard} from 'src/auth/role.guard';
import {Roles} from 'src/auth/roles-auth.decorator';
import {AddRoleDto} from './dto/add-role.dto';
import {BanUserDto} from './dto/ban-user.dto';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './users.model';
import {UsersService} from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {

	constructor(private userService: UsersService ){}

	@ApiOperation({summary: 'User creating'})
	// Describe response data: 
	@ApiResponse({ status: 200,	type: User,	})
	@Post()
	// We accept this type in the body
	create(@Body() userDto: CreateUserDto) {
		return this.userService.addUser(userDto);
	}

	@ApiOperation({summary: 'Get all users'})
	// Describe response data: 
	@ApiResponse({status: 200, type: [User]})
	// Use our guard function:
	@UseGuards(JwtAuthGuard)
	// Use our decorator:
	@Roles('ADMIN')
	// Use our guard:
	@UseGuards(RolesGuard)
	@Get()
	getAllUsers() {
		return this.userService.getUsers();
	}

	@ApiOperation({summary: 'Add role'})
	// Describe response data: 
	@ApiResponse({status: 200})
	// Use our decorator:
	@Roles('ADMIN')
	// Use our guard:
	@UseGuards(RolesGuard)
	@Post('/role')
	// Отримуємо дто в баді:
	addRole(@Body() dto: AddRoleDto) {
		return this.userService.addRole(dto);
	}

	@ApiOperation({summary: 'Ban user'})
	// Describe response data: 
	@ApiResponse({status: 200})
	// Use our decorator:
	@Roles('ADMIN')
	// Use our guard:
	@UseGuards(RolesGuard)
	@Post('/ban')
	// Отримуємо дто в баді:
	ban(@Body() dto: BanUserDto) {
		return this.userService.ban(dto);
	}
}
