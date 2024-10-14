import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '../auth/auth.guard'; // Assuming you have a JwtAuthGuard for authentication
import { Request } from 'express';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @Req() req: Request,
  ) {
    const client = req.user;
    console.log(client);
    return this.projectService.createProject(createProjectDto, client);
  }

  @Get()
  async getAllProjects() {
    return this.projectService.findAllProjects();
  }

  @Get(':id')
  async getProjectById(@Param('id') id: string) {
    return this.projectService.findProjectById(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.updateProject(id, updateProjectDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }
}
