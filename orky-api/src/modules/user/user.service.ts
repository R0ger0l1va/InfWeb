import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async update(id: number, user: User): Promise<User> {
    const userToUpdate = await this.findOne(id);
    if (!userToUpdate) {
      throw new Error('User not found');
    }
    userToUpdate.name = user.name;
    userToUpdate.email = user.email;
    userToUpdate.password = user.password;
    userToUpdate.role = user.role;
    return this.userRepository.save(userToUpdate);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepository.delete(id);
  }

  async updateAvatar(id: number, avatarUrl: string): Promise<User> {
    const user = await this.findOne(id);
    user.avatarUrl = avatarUrl;
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createSuperAdminIfNotExists(): Promise<void> {
    const superAdminEmail = process.env.SUPERADMIN_EMAIL;
    const superAdminPassword = process.env.SUPERADMIN_PASSWORD;

    // Verifica si ya existe
    if (!superAdminEmail || !superAdminPassword) {
      throw new Error('SuperAdmin email or password not found');
    }
    const existingSuperAdmin = await this.findByEmail(superAdminEmail);

    if (!existingSuperAdmin) {
      // Hashea la contraseña
      const hashedPassword: string = await bcrypt.hash(superAdminPassword, 10);

      const superAdmin = this.userRepository.create({
        name: 'orkyAdmin',
        email: superAdminEmail,
        password: hashedPassword,
        role: Role.ADMIN,
      });

      await this.userRepository.save(superAdmin);
      console.log('✅ SuperAdmin creado exitosamente');
    } else {
      // Si ya existe, actualizamos la contraseña por si cambió en el .env (o si tenía comillas por error)
      const hashedPassword: string = await bcrypt.hash(superAdminPassword, 10);
      existingSuperAdmin.password = hashedPassword;
      // Aseguramos que tenga role ADMIN
      existingSuperAdmin.role = Role.ADMIN;

      await this.userRepository.save(existingSuperAdmin);
      console.log('ℹ️ SuperAdmin actualizado con la contraseña del .env');
    }
  }
}
