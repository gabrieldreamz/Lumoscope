import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useCallback } from 'react';
import { AppNavigator } from './app/Navigation';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { fonts } from './constants/fonts';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/es/integration/react';
import Toast from 'react-native-toast-message';

export default function App() {
	const [fontsLoaded, fontError] = useFonts(fonts);
	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}
	const linking = {
		prefixes: ['com.lumoscope://'],
		config: {
			screens: {
				News: 'News/:id',
			},
		},
	};
	return (
		<GestureHandlerRootView onLayout={onLayoutRootView} style={{ flex: 1 }}>
			<SafeAreaProvider>
				<NavigationContainer linking={linking}>
					<BottomSheetModalProvider>
						<Provider {...{ store }}>
							<PersistGate loading={null} {...{ persistor }}>
								<Toast />
								<AppNavigator />
								<StatusBar
									style={'dark'}
									backgroundColor="transparent"
									translucent
								/>
							</PersistGate>
						</Provider>
					</BottomSheetModalProvider>
				</NavigationContainer>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
