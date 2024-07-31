import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppRoutes } from "../navigation";

export const useAppNavigation = () => {
  return useNavigation<NavigationProp<AppRoutes>>();
};