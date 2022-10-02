import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsString, Length} from 'class-validator';

export class CreateUserDto {
	
	@ApiProperty({example: 'name@gmail.com', description: 'Email address'})
	@IsString({message: 'Must be a string'})
	@IsEmail({}, {message: 'Not correct email'})
	readonly email: string;
	@ApiProperty({example: '19876', description: 'User password'})
	@IsString({message: 'Must be a string'})
	@Length(4, 16, {message: 'Min 4, Max 16 characters!'})
	readonly password: string;
}