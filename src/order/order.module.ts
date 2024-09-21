import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ItemModule } from './item/item.module';

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports: [ItemModule]
})
export class OrderModule {}
