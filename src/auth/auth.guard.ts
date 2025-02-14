// import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';
// import { PrismaService } from 'nestjs-prisma';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthGuard implements CanActivate {

//   constructor(
//     private reflector: Reflector,
//     private readonly prismaService: PrismaService,
//     private readonly jwtService: JwtService
//   ) { }


//   async canActivate(
//     context: ExecutionContext,
//   ): Promise<boolean | Promise<boolean> | Observable<boolean>> {
//     const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (isPublic) {
//       // 💡 See this condition
//       return true;
//     }


//     const request = context.switchToHttp().getRequest();
//     const token = this.extractTokenFromHeader(request);
//     if (!token) return false;


//     try {

//       const decodedToken = await this.jwtService.verify(token);
//       //if the request is POST on users, you won't get a user in the database
//       if (context.getClass().name === 'UsersController' && context.getHandler().name === 'create')
//         request['user'] = { id: decodedToken.sub }
//       else
//         request['user'] = await this.prismaService.user.findUniqueOrThrow({ where: { id: decodedToken.sub } })

//     }
//     catch { return false }


//     return true;
//   }


//   private extractTokenFromHeader(request: Request): string | undefined {
//     const [type, token] = request.headers.authorization?.split(' ') ?? [];
//     return type === 'Bearer' ? token : undefined;
//   }
// }


// export const IS_PUBLIC_KEY = 'isPublic';
// export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);