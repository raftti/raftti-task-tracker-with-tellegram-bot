import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TelegrafModule } from 'nestjs-telegraf'
import { join } from 'path'
import * as LocalSession from 'telegraf-session-local'
import { AppService } from './app.service'
import { AppUpdate } from './app.update'
import { TG_TOKEN } from './config'
import { TaskEntity } from './task.entity'

const sessions = new LocalSession({ database: 'session_db.json' })

@Module({
	imports: [
		TelegrafModule.forRoot({
			middlewares: [sessions.middleware()],
			token: TG_TOKEN
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			database: 'tacks',
			username: 'postgres',
			password: 'raftti1029384756',
			entities: [TaskEntity],
			synchronize: true
		}),
		TypeOrmModule.forFeature([TaskEntity])
	],
	providers: [AppService, AppUpdate]
})
export class AppModule {}
