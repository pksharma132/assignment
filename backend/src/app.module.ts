import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthGuard } from './auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'UserManagement',
        transport: Transport.TCP,
        options: { port: 3001, host: '127.0.0.1' },
      },
    ]),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: {
        expiresIn: '100d',
      },
    }),
    CacheModule.register(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthGuard,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
