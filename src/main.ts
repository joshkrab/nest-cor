import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {AppModule} from './app.module'


// Created main function for running server:
async function start() {
	// Outside variable or 5000:
	const PORT = process.env.PORT || 5000;
	// Creating app:
	const app = await NestFactory.create(AppModule);

	// Configure for swagger:
	const config = new DocumentBuilder()
		.setTitle('Progressive BACKEND code!')
		.setDescription('Documentation REST API...')
		.setVersion('1.0.0')
		//.addTag('My practice')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('/api/docs', app, document);

	// Run server:
	await app.listen(PORT, () => {
		console.log(`Server started on: http://localhost:${PORT}`);
	});
	
}
start();