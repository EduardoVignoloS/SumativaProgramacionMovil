import { Injectable } from '@angular/core';
import {
  PushNotifications,
  PermissionStatus,
  Token
} from '@capacitor/push-notifications';

import {
  LocalNotifications,
  ScheduleOptions
} from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationapiService {

  constructor() {
    this.initPush();
  }

  async initPush() {
    try {
      const permStatus: PermissionStatus = await PushNotifications.requestPermissions();

      if (permStatus.receive === 'granted') {
        PushNotifications.register();

        PushNotifications.addListener('registration', (token: Token) => {
          console.log('Push registration success, token: ', token.value);
        });

        PushNotifications.addListener('pushNotificationReceived', (notification) => {
          console.log('Notification received: ', notification);
        });
      } else {
        console.warn('Permisos de notificaciones no concedidos.');
      }
    } catch (error) {
      console.error('Error inicializando notificaciones push:', error);
    }
  }

  async scheduleReminderTask(taskTitle: string, time: Date) {
    try {
      const perms = await LocalNotifications.requestPermissions();

      if (perms.display === 'granted') {
        const noti: ScheduleOptions = {
          notifications: [
            {
              title: 'Tarea pendiente',
              body: `Recuerda: ${taskTitle}`,
              id: new Date().getTime(),
              schedule: {
                at: time
              },
              actionTypeId: '',
              extra: null
            }
          ]
        };

        await LocalNotifications.schedule(noti);
        console.log(`Notificación programada para ${time.toLocaleString()}`);
      } else {
        console.warn('Permiso para notificaciones locales denegado.');
      }
    } catch (error) {
      console.error('Error programando notificación local:', error);
    }
  }
}