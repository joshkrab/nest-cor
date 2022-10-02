import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from 'src/auth/jwt-auth.guard';
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
	@Get()
	getAllUsers() {
		return this.userService.getUsers();
	}
}
