import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { Message } from './chat.entity';
import { ChatService } from './chat.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, User])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
