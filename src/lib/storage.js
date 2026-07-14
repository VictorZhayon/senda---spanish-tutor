// Small, safe localStorage wrapper. Falls back to in-memory if storage is
// unavailable (e.g. private mode), so the app never crashes on read/write.

const NS = "senda.";
const memory = {};

export function load(key, fallback = null) {
  try {
    const raw = localStorage.getItem(NS + key);
    if (raw == null) return key in memory ? memory[key] : fallback;
    return JSON.parse(raw);
  } catch {
    return key in memory ? memory[key] : fallback;
  }
}

export function save(key, value) {
  memory[key] = value;
  try {
    localStorage.setItem(NS + key, JSON.stringify(value));
  } catch {
    /* ignore quota / disabled storage */
  }
}

export function remove(key) {
  delete memory[key];
  try {
    localStorage.removeItem(NS + key);
  } catch {
    /* ignore */
  }
}

export const todayKey = () => new Date().toISOString().slice(0, 10);
