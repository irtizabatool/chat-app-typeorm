import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { FilterDto } from './dto/filter-chat.dto';
import { User } from './user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message) private msgRepository: Repository<Message>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllMessages(): Promise<Message[]> {
    return this.msgRepository.find();
  }

  async getMessages(filterDto: FilterDto): Promise<Message[]> {
    const { sender, receiver } = filterDto;
    console.log(sender, receiver);
    const chat = await this.msgRepository.find({
      relations: ['sender', 'receiver'],
      select: ['message'],
      where: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    });
    return chat;
  }

  async insertMessage(createChatDto: CreateChatDto): Promise<Message> {
    const newMsg = await this.msgRepository.create(createChatDto);
    return this.msgRepository.save(newMsg);
  }
}
