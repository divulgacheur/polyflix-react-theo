import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Req,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
// import { Roles } from './../auth/decorators/roles.decorator';
import { Request } from 'express';
import { LoginUserStruct } from './dto/login-user.dto';
import { CreateUserStruct } from './dto/create-user.dto';
import { UserService } from './user.service';
// import { AuthGuard, PassportModule } from '@nestjs/passport';
// import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
// @UseGuards(RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() createUserDto: CreateUserStruct) {
        return await this.userService.create(createUserDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Req() req: Request, @Body() loginUserDto: LoginUserStruct) {
        return await this.userService.login(req, loginUserDto);
    }
}