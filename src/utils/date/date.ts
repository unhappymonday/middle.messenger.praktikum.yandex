import type { TMessageGroup, TMessages } from "@/layout/types";
import { MONTHS, WEEKDAYS } from "@/utils/constants";

const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

const daysAgo = (date: Date, now = new Date()) =>
  Math.round(
    (startOfDay(now).getTime() - startOfDay(date).getTime()) / 86_400_000,
  );

export const formatClock = (iso: string) =>
  new Date(iso).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

export const formatFullDate = (date: Date) =>
  `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

export const formatTime = (iso: string, now = new Date()) => {
  const date = new Date(iso);
  const diff = daysAgo(date, now);

  if (diff <= 0) return formatClock(iso);
  if (diff < 7) return WEEKDAYS[date.getDay()];
  return formatFullDate(date);
};

export const formatGroupLabel = (date: Date, now = new Date()) => {
  const diff = daysAgo(date, now);
  if (diff <= 0) return "Сегодня";
  if (diff === 1) return "Вчера";
  return formatFullDate(date);
};

export const groupMessagesByDate = (messages: TMessages[]): TMessageGroup[] => {
  const groups = new Map<string, TMessageGroup>();

  for (const message of messages) {
    const date = new Date(message.sent_at);
    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    if (!groups.has(key)) {
      groups.set(key, { label: formatGroupLabel(date), messages: [] });
    }
    groups.get(key)!.messages.push(message);
  }

  return [...groups.values()];
};
