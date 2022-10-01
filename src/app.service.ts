import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getUsers(): Array<{}>  {
    return [
			{id: 1, name: 'Ihor'},
			{id: 2, name: 'Max'},
		]
  }
}
