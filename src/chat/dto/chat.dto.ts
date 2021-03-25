import { Message } from '../chat.entity';

export class ChatDto {
  senderId: number;
  receiverId: number;
  message: string;
  constructor(chat: Message) {
    this.message = chat.message;
  }
}
