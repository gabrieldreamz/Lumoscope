import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useHeaderHeight from "../hooks/getHeight";
import { Text } from "./Text";
import colors from "../constants/Colors";
import { Icons } from "../assets/Icons";
import { layout } from "../constants";
import NetworkAware from "./NetworkAware";

interface Props {
  title: string;
  subtitle?: string;
  hideBackPress?: boolean;
  hideTopInset?: boolean;
  rightComponent?: React.ReactNode;
  subtitleWidth?: `${number}%`;
  marginBottom?: number;
}

export default function Header({
  title,
  hideBackPress,
  subtitle,
  hideTopInset,
  rightComponent,
  subtitleWidth = "70%",
  marginBottom,
}: Props): JSX.Element | null {
  const { insets } = useHeaderHeight();
  const navigation = useNavigation();

  const onBackPress = () => navigation.canGoBack() && navigation.goBack();
  const backgroundColor = colors.white;

  return (
    <>
      <NetworkAware heightInsets />
      <View
        style={[
          {
            backgroundColor,
            height: hideTopInset ? layout.spacing.padding / 2 : insets.top,
            marginBottom,
          },
        ]}
      />
      <View style={[styles.container, { backgroundColor }]}>
        <View style={[{ alignItems: "center" }]}>
          <Text
            fontWeight="700"
            fontSize={20}
            style={[{ marginBottom: subtitle ? 8 : 0 }]}
          >
            {title}
          </Text>
          {!subtitle ? <View style={{ height: 20 }} /> : ""}
          {Boolean(subtitle) && (
            <Text
              textAlign="center"
              style={{ width: subtitleWidth, marginBottom: 20 }}
            >
              {subtitle}
            </Text>
          )}
        </View>
        <View style={styles.items}>
          {navigation.canGoBack() && !hideBackPress && (
            <TouchableOpacity
              onPress={() => {
                onBackPress();
              }}
            >
              <Icons
                name="back-arrow"
                size={22}
                color={colors.primaryTextColor}
              />
            </TouchableOpacity>
          )}
          {rightComponent ? rightComponent : <View />}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    padding: layout.spacing.padding - 15, //Replace with layout sizes
  },
  items: {
    alignItems: "center",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
    marginTop: 8,
    paddingHorizontal: 12,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: -1,
  },
});
