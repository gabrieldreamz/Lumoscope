import { configureStore } from "@reduxjs/toolkit";
// @ts-ignore
import logger from "redux-logger";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import { apiMiddleware, apiReducerPath } from "../services/api";
import { rtkErrorMiddleware } from "./middleware/errorMiddleware";
import { rtkAPIMiddleware } from "./middleware/extraAPIMiddleware";
import rootReducer from "./rootReducer";
import { reduxStorage } from "./storage";
// ...

const persistConfig = {
  blacklist: [apiReducerPath],
  key: "root",
  storage: reduxStorage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .prepend(apiMiddleware, rtkAPIMiddleware, rtkErrorMiddleware)
      .concat(logger),
  reducer: persistedReducer,
});

export let persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type AppStateType = ReturnType<typeof store.getState>;
