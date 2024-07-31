import React from 'react';
import { Text as RNText, type TextProps, TextStyle } from 'react-native';
import colors from '../constants/Colors';


type FontWeight = '300' | '400' | '600' | '700';

type FontFamily =
  | 'Montserrat-Regular'
  | 'Montserrat-Light'
  | 'Montserrat-Medium'
  | 'Montserrat-Bold';

export type TextPropTypes = TextProps & {
  children?: string | React.ReactNode;
  fontWeight?: FontWeight;
  style?: TextStyle;
  color?: string;
  fontSize?: number;
  textAlign?: TextStyle['textAlign'];
  lineHeight?: TextStyle['lineHeight'];
};

const getFontFamily = (weight: FontWeight): FontFamily => {
  switch (weight) {
    case '300':
      return 'Montserrat-Light';
    case '400':
      return 'Montserrat-Regular';
    case '600':
      return 'Montserrat-Medium';
    case '700':
      return 'Montserrat-Bold';
    default:
      return 'Montserrat-Regular';
  }
};

export const Text = ({
  children,
  style,
  fontWeight = '400',
  color,
  fontSize,
  textAlign,
  lineHeight,
  ...props
}: TextPropTypes) => {
  const size = fontSize || 13;

  return (
    <RNText
      maxFontSizeMultiplier={1.3}
      minimumFontScale={0.7}
      style={[
        {
          color: color || colors.text,
          fontSize: size,
          lineHeight,
          // lineHeight: (style?.fontSize ?? size) * 1.5,
          textAlign,
        },
        { fontFamily: getFontFamily(fontWeight) },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};
