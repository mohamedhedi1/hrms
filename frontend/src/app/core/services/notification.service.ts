import { Notification } from './../models/notification';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  URL = 'http://localhost:3000/notifications';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  createNotification(notification: Notification) {
    return this.http.post<Notification>(
      this.URL,
      notification,
      this.httpOptions
    );
  }

  readNotification(id: string) {
    return this.http.patch<Notification>(
      `${this.URL}/${id}/read`,
      null,
      this.httpOptions
    );
  }

  unreadNotification(id: string) {
    return this.http.patch<Notification>(
      `${this.URL}/${id}/unread`,
      null,
      this.httpOptions
    );
  }

  cancelNotification(id: string) {
    return this.http.patch<Notification>(
      `${this.URL}/${id}/cancel`,
      null,
      this.httpOptions
    );
  }

  getNotificationsByRecipientId(recipientId: string) {
    return this.http.get<Notification[]>(
      `${this.URL}/from/recipient/${recipientId}`,
      this.httpOptions
    );
  }

  getReadNotifications() {
    return this.http.get<Notification[]>(`${this.URL}/read`, this.httpOptions);
  }

  readAllNotifications() {
    return this.http.patch<Notification[]>(
      `${this.URL}/read-all`,
      null,
      this.httpOptions
    );
  }

  cancelAllNotifications() {
    return this.http.patch<Notification[]>(
      `${this.URL}/cancel-all`,
      null,
      this.httpOptions
    );
  }
}
