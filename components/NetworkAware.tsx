import useHeaderHeight from "../hooks/getHeight";
import { useNetInfoInstance } from "@react-native-community/netinfo";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Text } from "./Text";
import colors from "../constants/Colors";
import { Icons } from "../assets/Icons";

interface Props {
  heightInsets?: boolean;
}

export default function NetworkAware({
  heightInsets,
}: Props): JSX.Element | null {
  const { netInfo, refresh } = useNetInfoInstance();
  const { headerHeight, insets } = useHeaderHeight();

  if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false) {
    return (
      <View
        style={[
          styles.container,
          {
            marginBottom: heightInsets ? undefined : -insets.top,
            marginTop: insets.top,
            minHeight: headerHeight - insets.top,
          },
        ]}
      >
        <View style={{ marginRight: 8 }}>
          <Icons name="wifi" size={18} color={colors.brown} />
        </View>
        <View>
          <Text color={colors.brown} fontWeight="700">
            Poor network connection
          </Text>
          <TouchableOpacity
            onPress={() => {
              refresh();
            }}
            style={{ flexDirection: "row", flexGrow: 1, paddingTop: 4 }}
          >
            <Text lineHeight={20} color={colors.brown}>
              Please check your internet connection and{" "}
              <Text
                color={colors.brown}
                fontWeight="700"
                style={{
                  textDecorationLine: "underline",
                }}
              >
                refresh
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightOrange,
    flexDirection: "row",
    padding: 16,
    paddingVertical: 8,
  },
});
