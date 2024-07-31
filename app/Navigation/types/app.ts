import { NavigatorScreenParams } from "@react-navigation/native";
import { AuthRoutes, OnboardingRoutes } from "./auth";

export type AppRoutes = {
  ClientStack: NavigatorScreenParams<ClientRoutes>;
  AuthStack: NavigatorScreenParams<AuthRoutes>;
  OnboardingStack: NavigatorScreenParams<OnboardingRoutes>;
};
export type ClientRoutes = {
  Dashboard: undefined;
  CityBuzz: undefined;
  Status: { id: string };
  Profile: undefined;
  News: { id: string };
};
