import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { FilterDto } from './dto/filter-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message) private msgRepository: Repository<Message>,
  ) {}

  async getAllMessages(): Promise<Message[]> {
    return await this.msgRepository.find();
  }

  async getMessages(filterDto: FilterDto): Promise<Message[]> {
    const { sender, receiver } = filterDto;
    console.log(sender, receiver);
    return await this.msgRepository.find({
      where: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    });
  }

  async insertMessage(createChatDto: CreateChatDto): Promise<Message> {
    const newMsg = this.msgRepository.create(createChatDto);
    return await this.msgRepository.save(newMsg);
  }
}
