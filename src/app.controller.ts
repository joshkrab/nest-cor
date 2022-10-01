import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// mark this class with a decorator @Controller
// Декоратор - така обгортка класа або функції, яка додає йому функціонал
// The controller accepts the URL prefix:
@Controller('/api')
export class AppController {

	constructor(private appService: AppService) {}

	// Creating a function for the response:
	// Add decorator for method and next url:
	@Get('/users')
	getUsers() {
		return this.appService.getUsers();
	}
}