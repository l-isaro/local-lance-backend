import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async createProject(
    createProjectDto: CreateProjectDto,
    client: Pick<User, 'email'>,
  ): Promise<Project> {
    const { title, description, deadline, status } = createProjectDto;
    const project = new this.projectModel({
      title,
      description,
      status: status || 'active',
      deadline,
      client,
    });

    return project.save();
  }

  async findAllProjects(): Promise<Project[]> {
    const currentDate = new Date();

    return this.projectModel.find({ deadline: { $gte: currentDate } }).exec();
  }

  async findProjectById(projectId: string): Promise<Project> {
    const project = await this.projectModel.findById(projectId).exec();
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async updateProject(
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.findProjectById(projectId);

    Object.assign(project, updateProjectDto);
    project.updatedAt = new Date();

    return this.projectModel
      .findByIdAndUpdate(projectId, project, { new: true })
      .exec();
  }

  async deleteProject(projectId: string): Promise<void> {
    await this.projectModel.findByIdAndDelete(projectId);
  }
}
