import { DynamicModule } from '@nestjs/common';
import { OrderProcessModule } from './orders/orders.module';
import { EventSourcingModule } from 'event-sourcing-nestjs';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

const configService = new ConfigService('.env');
const eventStoreHost = configService.get('EVENT_STORE_HOST');
//const viewDBHost = configService.get<string>('VIEW_DB_HOST');
//console.log(eventStoreHost);
// @Module({
//   imports: [
//     ConfigModule,
//     EventSourcingModule.forRoot({ mongoURL: eventStoreHost }),
//     //MongooseModule.forRoot(viewDBHost, { connectionName: 'view',}),
//     MongooseModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => ({
//         uri: configService.get('VIEW_DB_HOST'),
//       }),
//       inject: [ConfigService],
//     }),
//     OrderProcessModule,
    
//   ],
// })
// export class ApplicationModule {}



export class ApplicationModule {
  static forRoot(): DynamicModule {
      return {
          module: this,
          imports: [
            ConfigModule,
            EventSourcingModule.forRoot({ mongoURL: eventStoreHost }),
            //MongooseModule.forRoot(viewDBHost, { connectionName: 'view',}),
            MongooseModule.forRootAsync({
              imports: [ConfigModule],
              useFactory: async (configService: ConfigService) => ({
                uri: configService.get('VIEW_DB_HOST'),
              }),
              inject: [ConfigService],
            }),
            OrderProcessModule,
            
          ],
      };
  }
}

