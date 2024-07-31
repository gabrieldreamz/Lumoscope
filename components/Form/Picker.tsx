import { useCallback, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  type TextStyle,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import { useFormikContext } from 'formik';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';

import Input from './FormInput';
import { Text } from '../Text';
import colors from '../../constants/Colors';
import { Icons } from '../../assets/Icons';

type PickerItemProps = {
  value: string;
  label: string;
};

interface PickerFieldKeys {
  [key: string]: PickerItemProps;
}

interface Props {
  name: keyof PickerFieldKeys & string;
  onSelectItem?: (item: PickerItemProps) => void;
  coverStyle?: ViewStyle;
  inputStyle?: ViewStyle & TextStyle;
  style?: ViewStyle;
  label?: string;
  LeftComponent?: React.ReactNode;
  RightComponent?: React.ReactNode;
  error?: string | null;
  placeholder: string;
  items: PickerItemProps[];
  disabled?: boolean;
  itemStyle?: ViewStyle;
  onFocus?: () => void;
  hasSearch?: boolean;
  hasCustomList?: boolean;
  hasCustomIcon?: React.ReactNode;
}

export default function FormPicker({
  name,
  label,
  coverStyle,
  // error,
  LeftComponent,
  RightComponent,
  disabled,
  style,
  inputStyle,
  // value,
  placeholder,
  items,
  onSelectItem,
  itemStyle,
  onFocus,
  hasSearch,
  hasCustomList,
  hasCustomIcon,
}: Props): JSX.Element | null {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['45%', '50%', '75%'], []);
  const [search, setSearch] = useState('');

  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext<PickerFieldKeys>();

  const error = !!(errors[name] && touched[name]);
  const value = values[name]?.label;

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const BackDrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={1} />
    ),
    []
  );

  return (
    <>
      <TouchableOpacity
        disabled={disabled}
        style={[styles.container, coverStyle]}
        onPress={() => {
          handlePresentModalPress();
          onFocus?.();
        }}
      >
        {label && <Text style={styles.labelText}>{label}</Text>}
        <View
          style={[
            styles.content,
            !!error && { borderColor: colors.red },
            !!LeftComponent && { paddingLeft: 10 },
            !!RightComponent && { paddingRight: 10 },
            disabled && { backgroundColor: colors.borderGrey },
            style,
          ]}
        >
          {LeftComponent && LeftComponent}
          <View style={[styles.input, inputStyle]}>
            <Text
              style={[
                styles.text,
                !!value && { color: colors.primaryTextColor },
              ]}
            >
              {value ?? placeholder}
            </Text>
          </View>
          {RightComponent ?? (
            <Icons
              style={{ marginRight: 10 }}
              name="arrow-drop-down"
              size={18}
              color={colors.primaryTextColor}
            />
          )}
        </View>
        {!!error && (
          <View style={styles.error}>
            <Text style={styles.errorText}>
              {errors[name] as unknown as string}
            </Text>
          </View>
        )}
      </TouchableOpacity>
      <BottomSheetModal
        index={1}
        backdropComponent={BackDrop}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
      >
        <View style={{ flex: 1 }}>
          {hasSearch && (
            <View style={{ paddingHorizontal: 20 }}>
              <Input
                value={search}
                onChangeText={setSearch}
                placeholder="Search"
                coverStyle={{ marginBottom: 0 }}
                style={{ height: 45 }}
                clearButtonMode="while-editing"
              />
            </View>
          )}
          <FlatList
            data={items.filter((item) =>
              item.label.toLowerCase().includes(search.toLowerCase())
            )}
            style={{ paddingHorizontal: 20 }}
            renderItem={({ item }) => (
              <>
                {!hasCustomIcon && (
                  <TouchableOpacity
                    onPress={() => {
                      bottomSheetRef.current?.close();
                      setFieldTouched(name);
                      onSelectItem?.(item);
                      setFieldValue(name, item);
                    }}
                    style={{
                      paddingVertical: 10,
                      ...itemStyle,
                    }}
                  >
                    <Text
                      style={{
                        color:
                          value === item.value
                            ? colors.primaryBlue
                            : colors.primaryTextColor,
                      }}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
                {hasCustomList && (
                  <TouchableOpacity
                    onPress={() => {
                      bottomSheetRef.current?.close();
                      setFieldTouched(name);
                      onSelectItem?.(item);
                      setFieldValue(name, item);
                    }}
                    style={[styles.customItem, itemStyle]}
                  >
                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        gap: 20,
                      }}
                    >
                      {hasCustomIcon}
                      <Text
                        style={{
                          color:
                            value === item.value
                              ? colors.primaryBlue
                              : colors.primaryTextColor,
                        }}
                      >
                        {item.label}
                      </Text>
                    </View>

                    <View
                      style={{
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                      }}
                    >
                      {value === item.value && <Icons name='check' />}
                    </View>
                  </TouchableOpacity>
                )}
              </>
            )}
          />
        </View>
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  content: {
    alignItems: 'center',
    borderColor: colors.borderGrey,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    width: '100%',
  },
  customItem: {
    alignItems: 'center',
    borderColor: colors.borderGrey,
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
    marginVertical: 5,
    padding: 10,
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
    flex: 1,
    paddingHorizontal: 10,
  },
  labelText: {
    marginBottom: 5,
  },
  text: {
    color: colors.lightGrey,
    fontFamily: 'Montserrat-Regular',
  },
});
