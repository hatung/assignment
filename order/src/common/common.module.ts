import { Module } from '@nestjs/common';
import { UidGenerator } from './uid-generator';

@Module({
    exports: [
        UidGenerator,
    ],
    providers: [
        UidGenerator,
    ],
})
export class CommonModule {
}
