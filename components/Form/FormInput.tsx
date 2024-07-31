import { forwardRef, useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import { Text } from '../Text';
import colors from '../../constants/Colors';


export interface InputProps extends TextInputProps {
  coverStyle?: ViewStyle;
  inputStyle?: ViewStyle & TextStyle;
  style?: ViewStyle;
  label?: string;
  LeftComponent?: React.ReactNode;
  RightComponent?: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
  bottomComponent?: React.ReactNode;
}

const FormInput = forwardRef<TextInput, InputProps>(
  ({ RightComponent, LeftComponent, label, error, errorMessage, coverStyle, inputStyle, style, secureTextEntry, editable = true, bottomComponent, ...props }: InputProps, ref): JSX.Element => {
    const [showPassword, setShowPassword] = useState<boolean>(!secureTextEntry);

    const toggleSetShowPassword = () => setShowPassword(prev => !prev);

    return (
      <View style={[styles.container, coverStyle]}>
        {label && <Text fontWeight='600' fontSize={14} style={styles.labelText}>{label}</Text>}
        <View
          style={[
            styles.content,
            !!error && { borderColor: colors.red },
            !!LeftComponent && { paddingLeft: 10 },
            (!!RightComponent || secureTextEntry) && { paddingRight: 10 },
            !editable && { backgroundColor: colors.borderGrey },
            style,
          ]}>
          {LeftComponent && LeftComponent}
          <TextInput ref={ref} style={[styles.input, inputStyle]} placeholderTextColor={colors.lightGrey} secureTextEntry={!showPassword} editable={editable} {...props} />
          {secureTextEntry ? (
            <TouchableOpacity onPress={toggleSetShowPassword}>
              <Icon name={!showPassword ? 'visibility' : 'visibility-off'} size={18} color={colors.secondaryTextColor} />
            </TouchableOpacity>
          ) : (
            RightComponent && RightComponent
          )}
        </View>
        {error && (
          <View style={styles.error}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}
        {bottomComponent && <View style={{ marginTop: 8 }}>{bottomComponent}</View>}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  content: {
    alignItems: 'center',
    borderColor: colors.borderGrey,
    borderRadius: 20,
    backgroundColor: colors.formBg,
    borderWidth: 1,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    width: '100%',
  },
  error: {
    alignSelf: 'center',
    backgroundColor: colors.lightRed,
    paddingHorizontal: 10,
    paddingVertical: 7,
    width: '95%',
  },
  errorText: {
    color: colors.red,
  },
  input: {

    color: colors.primaryTextColor,
    flex: 1,
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 10,
  },
  labelText: {
    marginBottom: 8,


  },
});

export default FormInput;
