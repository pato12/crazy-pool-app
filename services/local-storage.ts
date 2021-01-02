import * as SecureStore from 'expo-secure-store';

export async function getItem<T>(key: string): Promise<T | null> {
  try {
    const data = await SecureStore.getItemAsync(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    return null;
  }
}

export async function storeItem<T>(key: string, data: T): Promise<void> {
  await SecureStore.setItemAsync(key, JSON.stringify(data));
}
