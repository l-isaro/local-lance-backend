import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { User } from '../user/schemas/user.schema'; // Assuming you have the User schema

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  // Create a new project
  async createProject(
    createProjectDto: CreateProjectDto,
    client: User,
  ): Promise<Project> {
    const { title, description, status } = createProjectDto;
    const project = new this.projectModel({
      title,
      description,
      status: status || 'active', // Default status
      client,
    });

    return project.save();
  }

  // Find all projects
  async findAllProjects(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  // Find a project by ID
  async findProjectById(projectId: string): Promise<Project> {
    const project = await this.projectModel.findById(projectId).exec();
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  // Update a project
  async updateProject(
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.findProjectById(projectId);

    // Apply the update
    Object.assign(project, updateProjectDto);
    project.updatedAt = new Date();

    // Save the updated project
    return this.projectModel
      .findByIdAndUpdate(projectId, project, { new: true })
      .exec();
  }

  // Delete a project
  async deleteProject(projectId: string): Promise<void> {
    await this.projectModel.findByIdAndDelete(projectId);
  }
}
