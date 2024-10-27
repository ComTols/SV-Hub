import { Component, OnInit } from '@angular/core';
import { ChatService } from '../backend/services/chat.service';

interface Message {
  id?: number; // Make `id` optional for new unsaved messages
  sender: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface Chat {
  chatId: number;
  user: string;
  messages: Message[];
  unreadCount: number;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  chats: Chat[] = [];
  selectedChat: Chat | null = null;
  newMessage: string = '';
  currentUser: string = 'currentUser';

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.getChats().subscribe((chats) => {
      this.chats = chats;
    });
  }

  selectChat(chat: Chat) {
    this.chatService.getMessages(chat.chatId).subscribe((messages) => {
      chat.messages = messages;
      this.selectedChat = chat;
    });
  }

  sendMessage() {
    if (this.newMessage.trim() && this.selectedChat) {
      const message: Omit<Message, 'id'> = {  // `Omit` excludes `id` for new messages
        sender: this.currentUser,
        content: this.newMessage,
        timestamp: new Date(),
        isRead: true,
      };

      this.chatService.sendMessage(this.selectedChat.chatId, message).subscribe((savedMessage) => {
        this.selectedChat?.messages.push(savedMessage); // `savedMessage` includes the new `id` from the backend
        this.newMessage = '';
      });
    }
  }

  markAsRead(message: Message) {
    if (!message.isRead) {
      message.isRead = true;
      if (message.id) {  // Ensure `id` exists before sending to backend
        this.chatService.markMessageAsRead(this.selectedChat!.chatId, message.id).subscribe();
      }
    }
  }
}
