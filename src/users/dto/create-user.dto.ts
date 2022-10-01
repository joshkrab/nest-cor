import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto {
	
	@ApiProperty({ example: 'name@gmail.com', description: 'Email address'})
	readonly email: string;
	@ApiProperty({ example: '19876', description: 'User password'})
	readonly password: string;
}