import {
  AnyAction,
  Middleware,
  MiddlewareAPI,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { logout } from "../features/authSlice";

interface Payload {
  data: unknown;
  status: number;
}

export const rtkErrorMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    handleRejectedWithValue(action, api);

    return next(action);
  };

const handleRejectedWithValue = (action: AnyAction, api: MiddlewareAPI) => {
  if (isRejectedWithValue(action)) {
    if ((action.payload as Payload)?.status === 401) {
      console.log(
        "🚀 ~ file: errorMiddleware.ts:19 ~ handleRejectedWithValue ~ action:",
        action.meta.arg?.endpointName
      );
    }
  }
};
