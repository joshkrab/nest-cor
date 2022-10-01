import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module'


// Created main function for running server:
async function start() {
	// Outside variable or 5000:
	const PORT = process.env.PORT || 5000;
	// Creating app:
	const app = await NestFactory.create(AppModule);
	// Run server:
	await app.listen(PORT, () => {
		console.log(`Server started on port: http://localhost:${PORT}`);
	});
	
}
start();