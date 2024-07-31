import {
  CompositeNavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export interface StackNavigationProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> {
  navigation: StackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
}

export interface RootNavigationProp<
  ParentParamList extends ParamListBase,
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<ParamList, Extract<RouteName, string>>,
    StackNavigationProp<ParentParamList, Extract<RouteName, string>>
  >;
  route: RouteProp<ParamList, RouteName>;
}

export type useRootNavigationProp<
  ParentParamList extends ParamListBase,
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList
> = CompositeNavigationProp<
  StackNavigationProp<ParamList, Extract<RouteName, string>>,
  StackNavigationProp<ParentParamList, Extract<RouteName, string>>
>;

export type useStackNavigationProp<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList
> = StackNavigationProp<ParamList, RouteName>;
