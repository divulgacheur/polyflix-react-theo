import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {

    private getEnvArgument(arg: string): string {
        return process.env[arg];
    }

    public getJwtSecret(): string {
        return this.getEnvArgument('JWT_SECRET') || 'secret';
    }

    }

