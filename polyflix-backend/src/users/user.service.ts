import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {Request} from 'express';
import {AuthService} from '../auth/auth.service';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import * as bcrypt from 'bcrypt';
import {CreateUserStruct} from './dto/create-user.dto';
import {LoginUserStruct} from './dto/login-user.dto';
import {User, UserDocument} from './schema/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserDocument>,
        private readonly authService: AuthService,
    ) {
    }

    async create(createUserDto: CreateUserStruct): Promise<User> {
        const user = new this.userModel(createUserDto);
        await this.isEmailUnique(user.email);
        await user.save();
        return UserService.buildRegistrationInfo(user);
    }

    async login(req: Request, loginUserDto: LoginUserStruct) {
        const user = await this.findUserByEmail(loginUserDto.email);
        await UserService.checkPassword(loginUserDto.password, user);
        return {
            fullName: user.fullName,
            email: user.email,
            token: await this.authService.createToken(user),
        };
    }

    private async isEmailUnique(email: string) {
        const user = await this.userModel.findOne({email});
        if (user) {
            throw new BadRequestException('Email most be unique.');
        }
    }

    private static buildRegistrationInfo(user): any {
        return {
            fullName: user.fullName,
            email: user.email,
        };
    }

    private async findByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({email});
        if (!user) {
            throw new NotFoundException('Email not found.');
        }
        return user;
    }

    private static async setUserAsVerified(user) {
        user.verified = true;
        await user.save();
    }

    private async findUserByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({email});
        if (!user) {
            throw new NotFoundException('Wrong email or password.');
        }
        return user;
    }

    private static async checkPassword(attemptPass: string, user) {
        const match = await bcrypt.compare(attemptPass, user.password);
        if (!match) {
            throw new NotFoundException('Wrong email or password.');
        }
        return match;
    }
}
