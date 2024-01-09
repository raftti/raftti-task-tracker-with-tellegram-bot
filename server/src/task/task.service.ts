import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entity/task.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
      ) {}

 async createTask(task: Task): Promise<Task> {
    return await this.taskRepository.save(task);
  }

  async getAllTasks(): Promise<any> {
    const data = await this.taskRepository.find();
    return data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).reverse();
  }
  

  deleteTask(id: number): string {
    this.taskRepository.delete(id);
    return 'Task deleted successfully!';
  }

  setStared(id: number): any {
    try {
      this.taskRepository.update(id, { isStared: true });
      return 'Задача отмечена как выполненная';
    } catch (error) {
      console.error('Ошибка при выполнении операции:', error);
      return 'Произошла ошибка при выполнении операции';
    }

  }
  
  setUnStared(id: number): any {
    try {
      this.taskRepository.update(id, { isStared: false });
      return 'Задача отмечена как выполненная';
    } catch (error) {
      console.error('Ошибка при выполнении операции:', error);
      return 'Произошла ошибка при выполнении операции';
    }
  }

  setStatus(id: number, status: string): string {
    try {
      this.taskRepository.update(id, {status})
  
      
      return 'Task marked as completed'
    } catch (error) {
      console.error('Error performing operation:', error)
      return 'An error occurred while performing the operation'
    }
  }

  updateTask(id: number, title: string, description: string): string {
    try {
      this.taskRepository.update(id, {title, description})
  
      
      return 'Task marked as completed'
    } catch (error) {
      console.error('Error performing operation:', error)
      return 'An error occurred while performing the operation'
    }
  }
}
