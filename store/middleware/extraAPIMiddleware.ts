import {
  AnyAction,
  Middleware,
  MiddlewareAPI,
  isFulfilled,
} from "@reduxjs/toolkit";

interface Payload {
  data: unknown;
  status: number;
}

export const rtkAPIMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    handleFulfilled(action, api);

    return next(action);
  };

const handleFulfilled = (action: AnyAction, _api: MiddlewareAPI) => {
  if (isFulfilled(action)) {
    if ((action.payload as Payload)?.status === 200) {
      console.log(
        "🚀 ~ file: extraAPIMiddleware.ts:26 ~ handleFulfilled ~ action.payload:",
        action.payload
      );
    }
  }
};
