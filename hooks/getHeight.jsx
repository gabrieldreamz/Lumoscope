import { getDefaultHeaderHeight } from '@react-navigation/elements';
import {
  EdgeInsets,
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export default function useHeaderHeight() {
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();

  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

  return { headerHeight, insets };
}
