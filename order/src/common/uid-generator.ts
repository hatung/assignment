import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UidGenerator {
    generate(): string {
        return uuidv4();
    }
}
