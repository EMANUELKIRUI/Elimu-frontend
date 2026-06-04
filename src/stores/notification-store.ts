import { create } from "zustand";

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  unread: boolean;
};

type NotificationState = {
  notifications: NotificationItem[];
  markAllRead: () => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [
    { id: "1", title: "Marks submitted", body: "Form 2 Mathematics awaits HOD review.", unread: true },
    { id: "2", title: "Payment received", body: "KES 48,000 posted to student account.", unread: true },
    { id: "3", title: "Purchase request pending", body: "Science department request needs approval.", unread: false }
  ],
  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((item) => ({ ...item, unread: false }))
    }))
}));
