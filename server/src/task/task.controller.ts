import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './entity/task.entity';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/all')
  getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Post('/')
  async createTask(@Body() task: Task): Promise<any> {
    return await this.taskService.createTask(task);
  }

  @Delete('/')
  async deleteTask(@Body() id: number): Promise<string> {
     return await this.taskService.deleteTask(id)
  }

  @Put('/set_un_star')
   setUnStaredTask(@Body() id: number): Promise<any> {
    return this.taskService.setUnStared(id)
  }

  @Put('/set_star')
   setStaredTask(@Body() id: number): Promise<any> {
    return this.taskService.setStared(id)
  }

  @Put('/')
  setStatus(@Body() {id, status}: {id: number, status: string}): string {
   return this.taskService.setStatus(id, status)
 }

 @Put('/update_task')
  updateTask(@Body() {id, title, description}: {id: number, title: string, description: string}): string {
   return this.taskService.updateTask(id, title, description)
 }
}
