import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn
} from 'typeorm'

@Entity()
export class TaskEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'text', nullable: true })
	title: string

	@Column({ nullable: true })
	description: string

	@Column({ default: false })
	isStared: boolean

	@Column({ default: false })
	isCompleted: boolean

	@CreateDateColumn()
	createdAt: Date
}
