type TNotificationType = 'success' | 'error';

export interface INotification {
  type: TNotificationType | null;
  message: string | null;
}
