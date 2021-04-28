import { Injectable } from '@nestjs/common';
// @ts-ignore
import { JwtService } from '@nestjs/jwt';
// import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        // private userService: UserService,
        private jwtService: JwtService,
    ) {}

    // async validateUser(email: string, pass: string): Promise<any> {
    //   const user = await this.userService.findUserByEmail(email);

    //   if (await this.userService.checkPassword(pass, user)) {
    //     const { password, ...result } = user;
    //     return result;
    //   }
    //   return null;
    // }

    async createToken(user: any) {
        const payload = { email: user.email, userId: user._Id };
        return this.jwtService.sign(payload);
    }
}
