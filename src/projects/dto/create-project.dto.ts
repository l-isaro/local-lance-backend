export class CreateProjectDto {
  readonly title: string;
  readonly description: string;
  readonly status?: string;
  readonly deadline?: Date;
}
