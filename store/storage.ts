import AsyncStorage from "@react-native-async-storage/async-storage";
import { Storage } from "redux-persist";

export const reduxStorage: Storage = {
  getItem: (key) => {
    const value = AsyncStorage.getItem(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    AsyncStorage.removeItem(key);
    return Promise.resolve();
  },
  setItem: (key, value) => {
    AsyncStorage.setItem(key, value);
    return Promise.resolve(true);
  },
};
