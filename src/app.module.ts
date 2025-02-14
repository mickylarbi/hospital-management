import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaModule } from 'nestjs-prisma';
import { UserService } from './user/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ThrottlerModule } from '@nestjs/throttler';
import { GenkitService } from './genkit/genkit.service';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    AuthModule,
    PrismaModule.forRoot({
      isGlobal: true
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PassportModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    JwtStrategy,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
    GenkitService
  ],
})
export class AppModule { }
