
import { BadRequestException, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { isBase64, isEmail, isEmpty, validate } from 'class-validator';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { LoginDto } from './dto/login-dto';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {


    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const req = context.switchToHttp().getRequest() as Request

        if (!isEmail(req.body.email) || isEmpty(req.body.email)) throw new BadRequestException('email must be an email')
        if (!isBase64(req.body.password) || isEmpty(req.body.password)) throw new BadRequestException('password must be base64 encoded')


        return super.canActivate(context)
    }
}
