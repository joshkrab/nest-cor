import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {JwtService} from '@nestjs/jwt';
import {Observable} from 'rxjs';
import {ROLES_KEY} from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

	constructor(
		private jwtService: JwtService,
		private reflector: Reflector,
	){}

	// return true or false for access:
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const req = context.switchToHttp().getRequest();

		try {
			// Рефлєктор достає потрібні нам данні:
			const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
			if (!requiredRoles) {
				return true;
			}

			const authHeader = req.headers.authorization;
			const [bearer, token] = authHeader.split(' ');

			if (bearer !== 'Bearer' || !token) {
				throw new UnauthorizedException({message: 'User is not authorized!'});
			}

			const user = this.jwtService.verify(token);
			req.user = user;

			return user.roles.some(role => requiredRoles.includes(role.value));
			
		} catch (error) {
			throw new HttpException('No access!', HttpStatus.FORBIDDEN);
			
		}

		return undefined;
	}
}