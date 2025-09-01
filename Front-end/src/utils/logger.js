import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

const STORAGE_KEY = "@logs_app";
const LOG_FILE = FileSystem.documentDirectory + "logs.txt";
const IS_DEV = __DEV__;

function formatMessage(level, message, error = null) {
  const timestamp = new Date().toISOString();
  let details = "";

  if (error instanceof Error) {
    details = `\nStack: ${error.stack}`;
  } else if (typeof error === "object" && error !== null) {
    details = `\nDetails: ${JSON.stringify(error, null, 2)}`;
  }

  return `[${timestamp}] [${level}] ${message}${details}`;
}

async function saveLog(log) {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    const logs = stored ? JSON.parse(stored) : [];
    logs.push(log);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(logs));

    await FileSystem.writeAsStringAsync(LOG_FILE, log + "\n", { append: true });
  } catch (err) {
    if (IS_DEV) console.error("Erro ao salvar log:", err);
  }
}

export const Logger = {
  async info(message, extra = null) {
    const log = formatMessage("INFO", message, extra);
    if (IS_DEV) console.log(log);
    await saveLog(log);
  },
  async warn(message, extra = null) {
    const log = formatMessage("WARN", message, extra);
    if (IS_DEV) console.warn(log);
    await saveLog(log);
  },
  async error(message, extra = null) {
    const log = formatMessage("ERROR", message, extra);
    if (IS_DEV) console.error(log);
    await saveLog(log);
  },
  async exportLogs() {
    console.log("📂 Arquivo exportado em:", LOG_FILE);
    return LOG_FILE;
  },
  async getLogs() {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },
  async clear() {
    await AsyncStorage.removeItem(STORAGE_KEY);
    await FileSystem.writeAsStringAsync(LOG_FILE, ""); 
  },
};
