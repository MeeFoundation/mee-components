export const storage = {
  _internal: {} as Record<string, string>,

  set: <T>(key: string, value: T, ttl = -1) => {
    const val = JSON.stringify({
      value,
      expiry: ttl === -1 ? -1 : Date.now() + ttl,
    });

    try {
      localStorage.setItem(key, val);
    } catch (e) {
      storage._internal[key] = val;
    }
  },

  raw: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return storage._internal[key] ?? null;
    }
  },

  get: <T>(key: string): T | null => {
    const val = storage.raw(key);
    if (!val) return null;

    const obj = JSON.parse(val);
    if (obj.expiry && obj.expiry !== -1 && obj.expiry < Date.now()) {
      storage.remove(key);
      return null;
    }

    return obj.value ?? null;
  },

  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      delete storage._internal[key];
    }
  },
};
