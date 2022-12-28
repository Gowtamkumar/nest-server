import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from '../entitis/file.entity';

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name);

  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepo: Repository<FileEntity>,
  ) {}

  getFiles(filterFile: any) {
    return this.fileRepo.find();
  }

  async getFile(id: string) {
    this.logger.log(`${this.getFile.name} Service Called`);
    const file = await this.fileRepo.findOne({ where: { id } });

    if (!file) {
      throw new NotFoundException(`File of id ${id} not found`);
    }

    return file;
  }

  async createFile(createFile: any) {
    this.logger.log(`${this.createFile.name} service Called`);

    const fileCreate = this.fileRepo.create(createFile);
    return this.fileRepo.save(fileCreate);
  }

  async updateFile(id: string, updateFile: any) {
    this.logger.log(`${this.updateFile.name} Service Called`);

    const findFile = await this.fileRepo.findOne({ where: { id } });

    if (!findFile) {
      throw new NotFoundException(`File of id ${id} not found`);
    }
    this.fileRepo.merge(findFile, updateFile);
    return this.fileRepo.save(findFile);
  }

  async deleteFile(id: string) {
    this.logger.log(`${this.deleteFile.name} service Called`);
    const file = await this.fileRepo.findOne({ where: { id } });

    if (!file) {
      throw new NotFoundException(`File of id ${id} not found`);
    }

    return this.fileRepo.remove(file);
  }
}
