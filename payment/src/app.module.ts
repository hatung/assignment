import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MicroservicesModule } from './microservice-client/microservice-client.module';

@Module({
  imports: [
    MicroservicesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
