import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { FilterDto } from './dto/filter-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}
  @Get()
  async getMessages(@Query() filterDto: FilterDto) {
    return await this.chatService.getMessages(filterDto);
  }

  @Post()
  async insertMessage(@Body() createChatDto: CreateChatDto) {
    return await this.chatService.insertMessage(createChatDto);
  }
}
