import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {CreateRoleDto} from './dto/create-role.dto';
import {RolesService} from './roles.service';

@Controller('roles')
export class RolesController {

	constructor(private rolesService: RolesService) { }
	
	@Post()
			// We accept this type in the body
	create(@Body() dto: CreateRoleDto) {
		return this.rolesService.createRole(dto);
	}
	
	@Get('/:value')
	getByValue(@Param('value') value: string) {
		return this.rolesService.getRoleByValue(value);
	}

}
