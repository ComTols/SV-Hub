import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Message {
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

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = '';

  constructor(private http: HttpClient) {}

  getChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.apiUrl}/chats`);
  }

  getMessages(chatId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/chats/${chatId}`);
  }

  sendMessage(chatId: number, message: Message): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/chats/${chatId}/messages`, message);
  }

  markMessageAsRead(chatId: number, messageId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/chats/${chatId}/messages/${messageId}`, { isRead: true });
  }
}
