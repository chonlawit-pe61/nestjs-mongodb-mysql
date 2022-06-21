import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private usersRepository: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const checkUser = await this.usersRepository.findOne({
      where: {
        username: createAdminDto.username,
      },
    });
    if (checkUser) {
      return 'User already exists';
    } else {
      await this.usersRepository.save(createAdminDto);
      return 'User created successfully';
    }
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    this.usersRepository.update(id, updateAdminDto);
    return 'User updated successfully';
  }

  findAll(): Promise<Admin[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<Admin> {
    return this.usersRepository.findOne({
      where: {
        id: Number(id),
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
