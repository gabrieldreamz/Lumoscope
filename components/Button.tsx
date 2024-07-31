import {
  ActivityIndicator,
  StyleSheet,
  type TextStyle,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
  type ViewStyle,
} from 'react-native';
import colors from '../constants/Colors';
import { Text, TextPropTypes } from './Text';


// import { Text, type TextPropTypes } from '../General';

type FontWeight = '300' | '400' | '600' | '700';

export type ButtonProps = TouchableOpacityProps & {
  text: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  textProps?: TextPropTypes;
  loading?: boolean;
  icon?: JSX.Element;
  fontWeight?: FontWeight;
  marginBottom?: number;
  outlineColor?: string;
  // fontWeight?: TextStyle['fontWeight']
};

export const Button = ({
  text,
  onPress,
  icon,
  backgroundColor = colors.primaryBlue,
  textColor = colors.white,
  style,
  textStyle,
  textProps,
  loading,
  disabled,
  marginBottom,
  fontWeight = '600',
  outlineColor,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? colors.lightGrey : backgroundColor,
          borderColor: outlineColor,
          borderWidth: outlineColor ? 1 : 0,
          marginBottom,
        },
        style,
      ]}
      disabled={disabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" animating color={textColor} />
      ) : (
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <View style={{ paddingRight: 4 }}>{icon}</View>
          <Text
            fontWeight={fontWeight}
            style={[styles.buttonText, { color: disabled ? colors.white : textColor, fontWeight }, textStyle]}
            {...textProps}
          >
            {text}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 4,
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: 48,
    width: '100%',
  },
  buttonText: {
    fontSize: 13,
  },
});
