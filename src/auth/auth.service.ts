import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {CreateUserDto} from 'src/users/dto/create-user.dto';
import {UsersService} from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import {User} from 'src/users/users.model';

@Injectable()
export class AuthService {
	// Інжектім сервіс у конструктор:
	constructor(
		private userService: UsersService,
		private jwtService: JwtService
	) { }
	
	async login(dto: CreateUserDto) {
		const user = await this.validateUser(dto);
		return this.generateToken(user);
	
	}
	
	async registration(dto: CreateUserDto) {
		const candidate = await this.userService.getUserByEmail(dto.email);
		if (candidate) {
			// Make 400 error:
			throw new HttpException('A user with this email address already exists', HttpStatus.BAD_REQUEST)
		}
		const hashPassword = await bcrypt.hash(dto.password, 5);
		const user = await this.userService.addUser({...dto, password: hashPassword});
		// Response token:
		return this.generateToken(user);
	
	}

	private async generateToken(user: User) {
		const payload = {
			email: user.email,
			id: user.id,
			roles: user.roles,
		}

		return {
			token: this.jwtService.sign(payload)
		}
	}

	private async validateUser(dto: CreateUserDto) {
		const user = await this.userService.getUserByEmail(dto.email);
		const passwordEquals = await bcrypt.compare(dto.password, user.password);
		
		if (user && passwordEquals) {
			return user;
		}
		// Status 401:
		throw new UnauthorizedException({message: 'Incorrect password or email'})
	}
}
