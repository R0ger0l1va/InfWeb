import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';

@ApiTags('Users') // Agrupa los endpoints en Swagger
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiBody({ type: User })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado exitosamente',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios', type: [User] })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: Number })
  @ApiResponse({ status: 200, description: 'Usuario encontrado', type: User })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: Number })
  @ApiBody({ type: User })
  @ApiResponse({ status: 200, description: 'Usuario actualizado', type: User })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async update(@Param('id') id: number, @Body() user: User): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: Number })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }

  @Put(':id/avatar')
  @ApiOperation({ summary: 'Actualizar la URL del avatar de un usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: Number })
  @ApiBody({ type: String })
  @ApiResponse({ status: 200, description: 'Avatar actualizado', type: User })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async updateAvatar(
    @Param('id') id: number,
    @Body() avatarUrl: string,
  ): Promise<User> {
    return this.userService.updateAvatar(id, avatarUrl);
  }
}
