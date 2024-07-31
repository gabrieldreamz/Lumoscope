import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoutes } from '../types';
import { ClientNavigator } from './Stacks';
import { AuthStack } from '../Auth';
import { OnboardingStack } from '../Onboard';
import { useAppSelector } from '../../../store/hooks';
import { useDeviceTokenMutateMutation } from '../../../services/auth';
import messaging from '@react-native-firebase/messaging';
import { handleMutationService } from '../../../services/config/handleService';

const { Navigator, Screen, Group } = createStackNavigator<AppRoutes>();
const AppNavigator = () => {
	const { onboarded, user } = useAppSelector((state) => state.authSlice);
	const [tokenMutation] = useDeviceTokenMutateMutation();

	async function requestUserPermission() {
		const authStatus = await messaging().requestPermission();
		const enabled =
			authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === messaging.AuthorizationStatus.PROVISIONAL;

		if (enabled) {
			console.log('Authorization status:', authStatus);
		}
	}
	async function getDeviceToken() {
		const token = await messaging().getToken();
		handleMutationService({
			mutation: tokenMutation({
				id: user?.user?.id,
				device_token: token,
			}),
			onError(error) {
				console.log(error, 'error');
			},
			onSuccess(success) {
				console.log(success, 'success');
			},
		});
	}
	useEffect(() => {
		requestUserPermission();
		getDeviceToken();
	}, []);

	return (
		<Navigator screenOptions={{ headerShown: false }}>
			{user ? (
				<Group>
					<Screen name="ClientStack" component={ClientNavigator} />
				</Group>
			) : onboarded ? (
				<Group>
					<Screen name="AuthStack" component={AuthStack} />
				</Group>
			) : (
				<Group>
					<Screen name="OnboardingStack" component={OnboardingStack} />
				</Group>
			)}
		</Navigator>
	);
};

export default AppNavigator;

const styles = StyleSheet.create({});
