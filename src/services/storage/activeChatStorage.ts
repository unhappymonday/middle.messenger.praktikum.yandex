const KEY_PREFIX = "activeChatId";

const getKey = (userId: number): string => `${KEY_PREFIX}:${userId}`;

export const activeChatStorage = {
  get(userId: number): number | null {
    try {
      const value = Number(window.localStorage.getItem(getKey(userId)));

      return Number.isInteger(value) && value > 0 ? value : null;
    } catch {
      return null;
    }
  },

  set(userId: number, chatId: number): void {
    try {
      window.localStorage.setItem(getKey(userId), String(chatId));
    } catch {}
  },

  clear(userId: number): void {
    try {
      window.localStorage.removeItem(getKey(userId));
    } catch {
      console.log("Error");
    }
  },
};
