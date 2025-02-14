
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string): Promise<any> {

        password = Buffer.from(password, 'base64').toString('utf-8')

        const user = await this.authService.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException('could not validate user');
        }

        return user;
    }
}
