import {
  TypedUseSelectorHook,
  useDispatch as useRRDispatch,
  useSelector as useRRSelector,
} from "react-redux";

import type { AppDispatch, AppStateType } from "../store";

export const useAppDispatch = (): AppDispatch => useRRDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useRRSelector;
